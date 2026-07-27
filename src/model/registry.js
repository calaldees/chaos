import { Unit } from "./unit.js"
import { Player } from "./player.js"

export class Registry {
    constructor() {
        this.units = []
        this.players = {}
    }

    getPlayerFromUnit(unit) {
        return this.players[unit.player_name]
    }
    getUnitsForPlayer(player) {
        // TODO? player_id? or Player object?
    }

    get state() {return this}
    set state(data) {
        this.units = data.units.map(Unit.fromState)
        this.players = Object.fromEntries(Object.entries(data.players).map(([player_name, data])=>[player_name, Player.fromState(data)]))
    }
}