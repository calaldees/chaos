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
        debugger
        this.players = Object.fromEntries(data.players.map(Player.fromState).map((player)=>[player.id, player]))
    }
}