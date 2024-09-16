import { COLOR } from "../gfx/color.js"
import { Unit } from "./unit.js"

export class Player {
    constructor(name, starting_unit_name, color=COLOR.yellow) {
        if (!name || !starting_unit_name) {throw Error()}
        this.name = name
        this.unit = new Unit(starting_unit_name, this.name)
        this.unit.animColorsOverride.push(color)
        this.units = []
    }
    newUnit(unit_name) {
        const unit = new Unit(unit_name, this.name)
        this.units.push(unit)
        return unit
    }
}