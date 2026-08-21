import { Action, ActionType } from '../model/actions.js'

export class ActionState {
    static AVAILABLE = new ActionState('available')
    static UNAVAILABLE = new ActionState('unavailable')
    static QUEUED = new ActionState('queued')
    constructor(name) {this.name = name}
    toString() {return `ActionState.${this.name}`}
}


export class QueuedActionManager {
    constructor() {
        this.actions = [] // of Action
    }
}