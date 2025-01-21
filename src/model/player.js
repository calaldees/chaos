import { COLOR } from "../gfx/color.js"

export class Player {
    // TODO? maybe this does not need a class and can just be a data object?
    static fromState(data) {
        const player = new Player(data.id, data.name, data.unit_type, data.color)
        return player
    }
    constructor(player_id, player_name, unit_type, color=COLOR.white) {
        if (!player_id || !unit_type) {throw Error()}
        this.id = player_id
        this.name = player_name || ''
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