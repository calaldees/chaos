import {unit_data} from '../data/unit_data.js'

export class Unit {
    constructor(unit_type, player_id) {
        console.assert(unit_data.hasOwnProperty(unit_type), `unit_type: ${unit_type} not in unit_data`)
        console.assert(player_id)
        this.unit_type = unit_type
        this.player_id = player_id

        this.status = new Set()
        this.positions = []
        this.moves_remaining = 0
        this.animColorsOverride = []
    }

    get template() {return unit_data[this.unit_type]}

    get pos() {return this.positions[0]}
    set pos(i) {this.positions.unshift(i)}  // use setter?

    get flip() {
        if (this.positions.length<2) {return 0}
        return (this.positions[0] > this.positions[1]) ? 1 : 0  // not correct, but a close hack
    }

    getAnimColorsOverride(frame) {
        // TODO: `frame` should take into account animeSpeed, but we don't have a gfx template here, we just have the data template
        return this.animColorsOverride[frame % this.animColorsOverride.length]
    }

}