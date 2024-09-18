import { isNumber, Dimension } from "../core.js"


export class Map {
    constructor(registry) {
        if (!registry.units) {throw TypeError()}
        Object.defineProperty(this, "registry", {writable: false, enumerable: false, value: registry})
        this.dimension = new Dimension(15, 10)
        this.map_data = new Array(this.dimension.size)
    }
    setUnit(_unit, i) {
        const unit    = isNumber(_unit) ? this.registry.units[_unit] : _unit
        const unit_id = isNumber(_unit) ? _unit : this.registry.units.findIndex((u)=>_unit==u)
        if (!isNumber(unit_id)) {throw Error(`unable to find ${unit} in registry.units`)}
        this.map_data[i] = unit_id
        unit.pos = i
    }
    getUnit(i) {
        const unit_id = this.map_data[i]
        if (!isNumber(unit_id)) {return}
        return this.registry.units[unit_id]
    }
}