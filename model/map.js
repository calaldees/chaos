import { isNumber, Dimension } from "../core.js"


import { Game } from "./game.js"

export class Map {
    constructor() {
        //if (!Array.isArray(unit_registry)) {throw TypeError()}
        this.dimension = new Dimension(15, 10)
        this.map_data = new Array(this.dimension.size)
    }
    setUnit(unit, i) {
        const unit_number = isNumber(unit) ? unit : Game.unit_registry.findIndex((_unit)=>unit==_unit)
        if (!isNumber(unit_number)) {throw Error(`unable to find ${unit}`)}
        this.map_data[i] = unit_number
        unit.setPos(i)
    }
    getUnit(i) {
        const unit_number = this.map_data[i]
        if (!isNumber(unit_number)) {return}
        return Game.unit_registry[unit_number]
    }
}