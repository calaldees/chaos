import { COLOR } from "../gfx/color.js"

export class Player {
    constructor(player_id, unit_type, color=COLOR.yellow) {
        if (!player_id || !unit_type) {throw Error()}
        this.id = player_id
        this.unit_type = unit_type
        this.color = color
        //this.unit = new Unit(starting_unit_name, this.name)
        //this.unit.animColorsOverride.push(color)
        //this.units = []
    }
    //newUnit(unit_name) {
    //    const unit = new Unit(unit_name, this.name)
    //    this.units.push(unit)
    //    return unit
    //}
}