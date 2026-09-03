import { isNumber, Dimension, range, enumerate, mod } from "../core.js"

export class MapChaos {
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
        unit.unit_id = unit_id  // Bit of a hack - we force the `unit_id` onto the unit
        this.map_data[i] = unit_id
        unit.pos = i
    }
    hasUnit(i) {return isNumber(this.map_data[i])}
    getUnit(i) {  // -> Unit
        const unit_id = this.map_data[i]
        if (!isNumber(unit_id)) {return}
        return this.registry.units[unit_id]
    }

    getUnitRadiusIndexes(i, radius_max=1, player_id=undefined, {include_friendly_units=false, include_enemy_units=false, include_empty=false, radius_min=1}) {
        return new Map(
            this.getUnitMoveIndexes(i, radius_max, true).entries()
            .filter(([i,r])=>{
                const distance_cutoff = radius_max - radius_min
                if (r>distance_cutoff) {return false}
                const unit = this.getUnit(i)
                if (unit) {
                    const friend = player_id == unit.player_id
                    const enemy  = !friend
                    return (friend && include_friendly_units) || (enemy && include_enemy_units)
                }
                return include_empty
            })
        )
    }
    getUnitMoveIndexes(i, radius=1, override_and_include_all=false) {
        const indexes = new Map([[i, radius]])
        for (let dt=radius ; dt>0 ; dt--) {
            for (let i of indexes.entries().filter(([i,d])=>d==dt).map(([i,d])=>i)) {
                const [x,y,z] = this.dimension.index_to_position(i)
                const pos_to_try = [[x+1,y],[x-1,y], [x,y+1],[x,y-1]]
                    .filter(([x,y])=>this.dimension.position_in_bounds(x,y))
                    .map   (([x,y])=>this.dimension.position_to_index(x,y))
                    .filter((i)=>!indexes.has(i))
                    .filter((i)=>!this.hasUnit(i) || override_and_include_all)  // filter-true =keep
                    .forEach((i)=>indexes.set(i, dt-1))
            }
        }
        indexes.delete(i)
        return indexes
    }

    get state() {return this}
    set state(data) {
        this.dimension.dimensions = data.dimension.dimensions
        this.map_data = data.map_data
    }

}