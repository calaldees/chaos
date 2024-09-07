
import {zip, hasIterationProtocol, all} from '../core.js'

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
    constructor(players) {
        if (!hasIterationProtocol(players)) {throw Error()}
        this.players = players
        this.map = new Map()
        for (let [player, start_location] of zip(this.players, START_LOCATIONS)) {
            if (!player) {continue}
            this.map.setUnit(player.unit, start_location)
        }
    }
}