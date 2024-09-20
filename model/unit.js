import {unit_data} from '../data/unit_data.js'

export class Unit {
    static fromState(state) {
        const unit = new Unit(state.unit_type, state.player_id, state)
        return unit
    }

    constructor(unit_type, player_id, state={}) {
        console.assert(unit_data.hasOwnProperty(unit_type), `unit_type: ${unit_type} not in unit_data`)
        console.assert(player_id)
        this.unit_type = unit_type
        this.player_id = player_id

        console.log(state)
        this.status = new Set(state.status)
        this.positions = state.positions || []
        this.moves_remaining = state.moves_remaining || 0
        this.animColorsOverride = state.animColorsOverride || []
    }

    get template() {return unit_data[this.unit_type]}

    get pos() {return this.positions[0]}
    set pos(i) {this.positions.unshift(i)}

    get flip() {
        if (this.positions.length<2) {return 0}
        return (this.positions[0] > this.positions[1]) ? 1 : 0  // not correct, but a close hack
    }

    getAnimColorsOverride(frame) {
        // TODO: `frame` should take into account animeSpeed, but we don't have a gfx template here, we just have the data template
        return this.animColorsOverride[frame % this.animColorsOverride.length]
    }

}