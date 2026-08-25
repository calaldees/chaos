import { gfx_units } from '../gfx/units.js'
import { Action, ActionType } from '../model/actions.js'
import { SpriteEffect, HighlightEffect, InvertEffect } from '../gfx/gfx_effects.js'

export class ActionState {
    static AVAILABLE = new ActionState('available')
    static UNAVAILABLE = new ActionState('unavailable')
    static QUEUED = new ActionState('queued')
    constructor(name) {this.name = name}
    toString() {return `ActionState.${this.name}`}
}


export class QueuedActionManager {
    constructor(game, player) {
        Object.defineProperty(this, "game"  , {writable: false, enumerable: true, value: game  })
        Object.defineProperty(this, "player", {writable: false, enumerable: true, value: player})

        this.actions = new Map()  // <ActionKey<type,unit_id>, Action>
        this.action_effects = new Array()
    }

    get units() {return this.game.registry.getUnitsForPlayerID(this.player.id)}

    addAction(action) {
        this.actions.set(action.key, action)
        this._validateActions()
        this.generateActionEffects()
    }
    cancelAction(action_key) {
        this.actions.delete(action_key)
        this._validateActions()
        this.generateActionEffects()
    }

    actionUnitState(unit) {
        const action_states = new Map([
            [ActionType.MOVE, Boolean(unit.mov)],
            [ActionType.ATTACK, Boolean(unit.com)],
            [ActionType.RANGEATTACK, Boolean(unit.rcn)],
            [ActionType.SPELL, Boolean(unit.spells)],
        ].map(([action_type, available])=>{
            const action_state = available ? ActionState.AVAILABLE : ActionState.UNAVAILABLE
            return [action_type, action_state]
        }))
        this.actions.values()
            .filter((action)=>action.unit_id=unit.unit_id)
            .filter((action)=>action_states.get(action.action_type)==ActionState.AVAILABLE)
            .forEach((action)=>{
                action_states.set(action_type, ActionState.QUEUED)
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
        console.log(`ActionEffectError: Unknown ActionType ${action.action_type}`)
        return []
    }
}

