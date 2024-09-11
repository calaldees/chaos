import {unit_data} from '../data/unit_data.js'

export class Unit {
    constructor(unit_name, owner) {
        console.assert(unit_data.hasOwnProperty(unit_name), `unit_name: ${unit_name} not in unit_data`)
        this.unit_name = unit_name

        //this.template = template  // data template for model (not gfx template) // do not serialize? and relink. But it's only data, so maybe serialise is ok
        this.owner = owner
        this.status = new Set()
        this.positions = []
        this.moves_remaining = 0
        this.animColorsOverride = []
    }

    get template() {return unit_data[this.unit_name]}

    get pos() {return this.positions[0]}
    setPos(i) {this.positions.unshift(i)}  // use setter?

    get flip() {
        if (this.positions.length<2) {return 0}
        return (this.positions[0] > this.positions[1]) ? 1 : 0  // not correct, but a close hack
    }

    getAnimColorsOverride(frame) {
        // TODO: `frame` should take into account animeSpeed, but we don't have a gfx template here, we just have the data template
        return this.animColorsOverride[frame % this.animColorsOverride.length]
    }

}