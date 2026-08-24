import { Action, ActionType } from '../model/actions.js'

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
        this.action_effects = new Map()
    }

    get units() {return this.game.registry.getUnitsForPlayerID(this.player.id)}

    addAction(action) {
        this.actions.set(action.key, action)
        this._validateActions()
        this._refreshActionEffects()
    }
    cancelAction(action_key) {
        this.actions.delete(action_key)
        this._validateActions()
        this._refreshActionEffects()
    }

    //get actionUnitStates() {  // Map<unit_id,{action_type,state}>
    //    return new Map(this.units.map((unit)=>[unit_id,this._actionUnitState(unit)]))
    //}
    actionUnitState(unit) {
        action_states = new Map([
            [ActionType.MOVE, Boolean(unit.mov)],
            [ActionType.ATTACK, Boolean(unit.com)],
            [ActionType.RANGEATTACK, Boolean(unit.rcn)],
            [ActionType.SPELL, Boolean(unit.spells)],
        ].map(([action_type, available])=>[action_type,available?ActionState.AVAILABLE:ActionState.UNAVAILABLE]))
        unit_actions = this.actions.values().filter((action)=>action.unit_id=unit.unit_id)
        for (let action of unit_actions) {
            if (action.action_type == ActionType.MOVE) {

            }
        }
        return new Map()
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

    _refreshActionEffects() {

    }

    _actionEffect(action) {
        if (action.action_type == ActionType.MOVE) {
            // new Action(ActionType.MOVE, this.actions.player.id, this.unit_selected.unit_id, i, undefined)
            const unit_type = this.game.registry.units[action.unit_id].unit_type
            return
            //this.addSelectedEffect(i, new SpriteEffect(...gfx_units[this.unit_selected.unit_type].sprite_and_color(0)))
        }
        throw new Error(`ActionEffectError: Unknown ActionType ${action.action_type}`);
    }
}

