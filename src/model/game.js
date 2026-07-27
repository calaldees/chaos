
import {getRandomInt, zip, hasIterationProtocol, assertEquals} from '../core.js'

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
    7:[],  // TODO
    8:[],  // TODO
}

export class Game {
    constructor(players) {  // players:Player[]
        Object.defineProperty(this, "registry", {writable: false, enumerable: true, value: new Registry()})
        this.map = new Map(this.registry)

        //if (!hasIterationProtocol(players)) {throw TypeError()}
        if (!players) {return}

        for (let player of players) {
            if (player.constructor.name != 'Player') {throw Error('Game must be constructed with `Player` objects')}
            this.registry.players[player.id] = player
        }
        assertEquals(players.length, PLAYER_START_INDEX[players.length].length)
        for (let [player, i_start_location] of zip(players, PLAYER_START_INDEX[players.length])) {
            if (!player) {continue}
            const unit = this.newUnit(player.unit_type, player.id, i_start_location, {stat_modifiers: {
                // https://www.archaos.co.uk/chaos-disassembly/asm/8cf2.html
                com: getRandomInt(9)>>1,
                def: getRandomInt(9)>>1,
                mnv: getRandomInt(9)>>1,
                res: getRandomInt(9)>>2,
                spells: 9,  // meant to to be random but only seems to affect computer players, so a constant for now
            }})
            unit.animColorsOverride.push(player.color)
        }
    }
    newUnit(unit_type, player_id, i, state={}) {
        const unit = new Unit(unit_type, player_id, state)
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