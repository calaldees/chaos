import { Unit } from "./unit.js"
import { Player } from "./player.js"

export class Registry {
    constructor() {
        this.units = []
        this.players = {}
    }

    getPlayer(unit) {
        return this.players[unit.player_name]
    }

    get state() {return this}
    set state(data) {
        this.units = data.units.map(Unit.fromState)
        this.players = Object.fromEntries(Object.entries(data.players).map(([player_name, data])=>[player_name, Player.fromState(data)]))
    }
}