
import {zip, hasIterationProtocol} from '../core.js'

import { Unit } from "./unit.js"
import { Map } from './map.js'
import { Registry } from './registry.js'


export const INDEX_START = [
    16,  // top left
    133, // bottom right
    121, // bottom left
    28,  // top right
    22,  // middle top
    127, // middle bottom
    // player 7?
    // player 8?
]

export class Game {
    constructor(players) {
        Object.defineProperty(this, "registry", {writable: false, enumerable: true, value: new Registry()})
        if (!hasIterationProtocol(players)) {throw TypeError()}
        for (let player of players) {
            this.registry.players[player.id] = player
        }
        this.map = new Map(this.registry)
        for (let [player, start_location] of zip(players, INDEX_START)) {
            if (!player) {continue}
            const unit = this.newUnit(player.unit_type, player.id, start_location)
            unit.animColorsOverride.push(player.color)
        }
    }
    newUnit(unit_type, player_id, i) {
        const unit = new Unit(unit_type, player_id)
        const unit_id = this.registry.units.push(unit)-1
        this.map.setUnit(unit_id, i)
        return unit
    }

    // used for serialiseing the state of the whole game and sending it over the network or disk
    get stateJSON() {
        function replacer(key, value) {
            if (value instanceof Set) {return [...value]}
            return value
        }
        return JSON.stringify(this.state, replacer)
    }
    set stateJSON(data) {this.state = JSON.parse(data)}
    get state() {return this}
    set state(data) {
        this.registry.state = data.registry
        this.map.state = data.map
    }

}