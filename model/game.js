
import {zip, hasIterationProtocol} from '../core.js'

import {Map} from './map.js'

const START_LOCATIONS = [
    16,  // top left
    133, // bottom right
    121, // bottom left  
    28,  // top right
    22,  // middle top
    127, // middle bottom
]

export class Game {
    static player_registry = {}
    static unit_registry = []
    static {
        //Game.player_registry = {}
        //Game.unit_registry = []
    }

    constructor(players) {
        if (!hasIterationProtocol(players)) {throw TypeError()}
        for (let player of players) {
            Game.player_registry[player.name] = player
        }
        this.map = new Map()
        for (let [player, start_location] of zip(players, START_LOCATIONS)) {
            if (!player) {continue}
            Game.unit_registry.push(player.unit)
            this.map.setUnit(player.unit, start_location)
        }
    }

    getPlayer(unit) {
        return Game.player_registry[unit.player_name]
    }

    // used for serialiseing the state of the whole game and sending it over the network or disk
    get state() {return this}
    set state(data) {throw new Error("not implemented")}
    get stateJSON() {return JSON.stringify(this.state)}
    set stateJSON(data) {this.state = JSON.parse(data)}
}