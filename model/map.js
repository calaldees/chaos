import { enumerate, Dimension } from "../core.js";


export class Map {
    constructor() {
        this.dimension = new Dimension(15, 10, 1)
        this.data = new Array(16*12)
    }
    * dirty(frame) {
        for (let [i, unit] of enumerate(this.data)) {
            if (unit && unit.dirty(frame)) {
                yield [this.dimension.index_to_position(i), unit]
            }
        }
    }
    setUnit(unit, x, y) {
        this.data[this.dimension.position_to_index(x,y,1)] = unit
    }
    getUnit(x, y) {
        return this.data[this.dimension.position_to_index(x,y,1)]
    }
}