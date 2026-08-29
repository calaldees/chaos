/*
-- User actions --
(Are attack and move the same thing?)
Move unit
   unit mov reduction
   modify map
Attack (unit from unit, i to i) [for match/hash?]
    check pre
    resolve combat
        +add effects
        +remove unit
Enter/Use
    Mount/Castle/Tree
Cast spell
    player
    spell id
    optional location
    resolve
        run spell func
        +add effects
        +add
        +remove
        +UpdateState(remove spell)

State Modifiers
These are not actions as they are not user entered - these are modifications to state
Add Effects
Remove (unit, player, i)
Add unit(player, unit, i)
Move
Update state (e.g. number of moves left, dead,)

Whole State
(be able to transfer the whole state to clients)
Current state has hash
Clients can see if their state is out of date and request the whole state
*/

export class ActionType {
    static MOVE = new ActionType('move')
    static ATTACK = new ActionType('attack')
    static RANGEATTACK = new ActionType('rangeattack')
    static SPELL = new ActionType('spell')
    static USE = new ActionType('use')  // unneeded? is this just Use/Enter/Attack
    constructor(name) {this.name = name}
    toString() {return `ActionType.${this.name}`}
}

export const actionKey = (unit_id, action_type) => `${unit_id}-${action_type}`  // made this just for explicit visibility. I wish I had types

// This can be sent across a network, so must not have references to objects
export class Action {
    constructor(player_id, unit_id, action_type, target_i, target_id) {
        this.player_id = player_id
        this.unit_id = unit_id
        this.action_type = action_type
        this.target_i = target_i
        this.target_id = target_id  // for validation
    }
    get key() {return actionKey(this.unit_id, this.action_type)}
}