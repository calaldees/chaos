import { COLOR } from "../gfx/color.js"

export class Player {
    constructor(name, unit, color=COLOR.yellow) {
        if (!name || !unit) {throw Error()}
        this.name = name
        this.unit = unit
        this.unit.animColorsOverride.push(color)
        this.units = []
    }
}