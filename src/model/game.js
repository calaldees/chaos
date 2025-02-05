
import {zip, hasIterationProtocol} from '../core.js'

import { Unit } from "./unit.js"
import { Map } from './map.js'
import { Registry } from './registry.js'


export const PLAYER_START_INDEX = {
    0: [],
    1: [67],
    2: [33, 116],
    3: [22, 108, 116],
    4: [34, 40, 109, 115],
    5: [7, 62, 139, 145, 72],
    6: [
        16,  // top left
        133, // bottom right
        121, // bottom left
        28,  // top right
        22,  // middle top
        127, // middle bottom
    ],
    7:[],
    8:[],
}

export class Game {
    constructor(players) {
        Object.defineProperty(this, "registry", {writable: false, enumerable: true, value: new Registry()})
        this.map = new Map(this.registry)

        //if (!hasIterationProtocol(players)) {throw TypeError()}
        if (!players) {return}

        for (let player of players) {
            if (player.constructor.name != 'Player') {throw Error()}
            this.registry.players[player.id] = player
        }
        for (let [player, start_location] of zip(players, PLAYER_START_INDEX[players.length])) {
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
    //get stateJSON() {return JSON.stringify(this.state, replacer)}
    //set stateJSON(data) {this.state = JSON.parse(data)}
    get state() {return this}
    set state(data) {
        this.registry.state = data.registry
        this.map.state = data.map
    }

}