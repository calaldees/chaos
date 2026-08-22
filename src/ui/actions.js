import { filterInPlace } from '../core.js'
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

        this.actions = [] // of Action
    }

    get units() {return this.game.registry.getUnitsForPlayerID(this.player.id)}

    addAction(action) {
        // Remove duplicate actions
        filterInPlace(this.actions, (a)=>!(action.unit_id==a.unit_id && action.action_type==a.action_type))
        this.actions.push(action)
    }
}