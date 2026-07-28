import { Unit } from "./unit.js"
import { Player } from "./player.js"

export class Registry {
    constructor() {
        Object.defineProperty(this, "units"  , {writable: false, enumerable: true, value: new Array()}) // Array[Unit]
        Object.defineProperty(this, "players", {writable: false, enumerable: true, value: new Map()  }) // Map[PlayerID, Player]
    }

    getPlayerFromUnit(unit) {
        return this.players[unit.player_id]
    }
    getUnitsForPlayerID(player_id) {
        return this.units.filter((unit)=>{unit.player_id==player_id})
    }

    get state() {return this}
    set state(data) {
        this.players.clear()
        for (let player_data of data.players.values()) {
            const player = Player.fromState(player_data)
            this.players.set(player.id, player)
        }
        this.units.clear()
        this.units.push(...data.units.map(Unit.fromState))
        // TODO: check all units belong to players?
    }
}