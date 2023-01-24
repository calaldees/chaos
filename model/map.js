import { enumerate, Dimension } from "../core.js";


export class Map {
    constructor() {
        this.dimension = new Dimension(15, 10)
        this.data = new Array(this.dimension.size)
    }
    setUnit(unit, i) {
        this.data[i] = unit
        unit.setPos(i)
    }
    getUnit(i) {
        return this.data[i]
    }
    moveUnit(i1, i2) {

    }
}