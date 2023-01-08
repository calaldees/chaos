import { enumerate, Dimension } from "../core.js";


export class Map {
    constructor() {
        this.dimension = new Dimension(15, 10, 1)
        this.data = new Array(16*12)
    }
    setUnit(unit, x, y) {
        this.data[this.dimension.position_to_index(x,y,1)] = unit
    }
    getUnit(x, y) {
        return this.data[this.dimension.position_to_index(x,y,1)]
    }
}