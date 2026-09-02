import { sprites } from '../gfx/sprites.js'
import { gfx_units } from '../gfx/units.js'
import { Action, ActionType, actionKey } from '../model/actions.js'
import { SpriteEffect, HighlightEffect, InvertEffect } from '../gfx/gfx_effects.js'

export class ActionState {
    static AVAILABLE = new ActionState('available')
    static UNAVAILABLE = new ActionState('unavailable')
    static NOTARGETS = new ActionState('no-targets')
    static QUEUED = new ActionState('queued')
    constructor(name) {this.name = name}
    toString() {return `ActionState.${this.name}`}
}


export class QueuedActionManager {
    constructor(game, player) {
        Object.defineProperty(this, "game"  , {writable: false, enumerable: true, value: game  })
        Object.defineProperty(this, "player", {writable: false, enumerable: true, value: player})

        this.actions = new Map()  // <ActionKey<unit_id,action_type>, Action>
        this.action_effects = new Array()
    }

    get units() {return this.game.registry.getUnitsForPlayerID(this.player.id)}

    addAction(action) {
        this.actions.set(action.key, action)
        this._validateActions()
        this.generateActionEffects()
    }
    hasAction(action_key) {
        return this.actions.has(action_key)
    }
    cancelAction(action_key) {
        this.actions.delete(action_key)
        this._validateActions()
        this.generateActionEffects()
    }

    getActionTypeToIndexes(unit_id) {  // <ActionType, [i]>
        const unit = this.game.registry.units[unit_id]
        const unit_actions = this.actions.values().filter((action)=>action.unit_id==unit.unit_id)
        const unit_pos_override = [...unit_actions.filter((a)=>a.action_type == ActionType.MOVE).map((a)=>a.target_i)].pop()
        const map = this.game.map
        const getIndexesForActionType = (action_type) => {
            const unit_pos = typeof(unit_pos_override)=="number" ? unit_pos_override : unit.pos
            if (action_type == ActionType.MOVE) {
                // `unit.pos` can never be overridden for move actions
                return map.getUnitRadiusIndexes(unit.pos, unit.stats.mov, unit.player_id, {include_friendly_units:false, include_enemy_units:false, include_empty: true})
                // TODO: Set.ids -- All existing target_id index of existing ActionType.MOVE actions. We don't want two units moving to the same square
            }
            if (action_type == ActionType.ATTACK) {
                return map.getUnitRadiusIndexes(unit_pos, unit.stats.com ? 1 : 0, unit.player_id, {include_enemy_units: true, include_empty: false, include_friendly_units: false})
            }
            if (action_type == ActionType.RANGEATTACK) {
                // TODO: check if `rng` follows the same distance rules as movement? or is diagonal allowed?
                return map.getUnitRadiusIndexes(unit_pos, unit.stats.rng, unit.player_id, {include_enemy_units: true, include_empty: false, include_friendly_units: false})
                // TODO: map over the responses and remove all item with radius==1 (or unit.stats.rng-1) - range can't be used point blank
            }
            if (action_type == ActionType.USE) {
                if (unit.template.status.indexOf("canMount")==-1) {return new Map()}
                return map.getUnitRadiusIndexes(unit_pos, 1, unit.player_id, {include_friendly_units: true, include_empty: false, include_enemy_units: false})
                // TODO: additional checks for can_use/mount
                // check that the target_id is mountable?
            }
            throw new Error('unknown ActionType')
        }
        return new Map(
            [
                ActionType.MOVE,
                ActionType.ATTACK,
                ActionType.RANGEATTACK,
                ActionType.USE
            ].map(
                (action_type)=>[action_type,getIndexesForActionType(action_type)]
            )
        )
    }

    actionUnitState(unit) {
        const unit_stats = unit.stats
        const action_states = new Map([
            [ActionType.MOVE, Boolean(unit_stats.mov)],
            [ActionType.ATTACK, Boolean(unit_stats.com)],
            [ActionType.RANGEATTACK, Boolean(unit_stats.rcn)],
            [ActionType.SPELL, Boolean(unit_stats.spells)],
        ].map(([action_type, available])=>{
            const action_state = available ? ActionState.AVAILABLE : ActionState.UNAVAILABLE
            return [action_type, action_state]
        }))
        this.actions.values()
            .filter((action)=>action.unit_id==unit.unit_id)
            .filter((action)=>action_states.get(action.action_type)==ActionState.AVAILABLE)
            .forEach((action)=>{
                action_states.set(action.action_type, ActionState.QUEUED)
            })
        return action_states
    }

    _validateActions() {
        for (let action of this.actions.values()) {
            if (!this._validateAction(action)) {
                this.actions.delete(action.key)
            }
        }
    }

    _validateAction(action) { // bool
        // if not valid return false to remove from list of actions
        return true
    }

    generateActionEffects() {  // GfxEffect[]
        this.action_effects.forEach(([i, effect])=>effect.active = false)
        this.action_effects = [...this.actions.values().flatMap((action)=>this._actionIndexEffectsForAction(action))]
    }

    _actionIndexEffectsForAction(action) {  // [ [i, GfxEffect] ]
        if (action.action_type == ActionType.MOVE) {
            const unit_type = this.game.registry.units[action.unit_id].unit_type
            return [
                // TODO: Move path?
                [action.target_i ,new SpriteEffect(...gfx_units[unit_type].sprite_and_color(0))],
            ]
            //this.ui_map.addEffect(action.target_i, effect)
        }
        if (action.action_type == ActionType.ATTACK) {
            return [
                [action.target_i, new SpriteEffect(sprites.cursor[2])],
            ]
        }
        console.log(`ActionEffectError: Unknown ActionType ${action.action_type}`)
        return []
    }
}

