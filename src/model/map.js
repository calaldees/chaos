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
        this.map_data[i] = unit_id
        unit.pos = i
    }
    getUnit(i) {  // -> Unit
        const unit_id = this.map_data[i]
        if (!isNumber(unit_id)) {return}
        return this.registry.units[unit_id]
    }

    getRangeAttackIndexes(unit) {
        // TODO: check if `rng` follows the same distance rules as movement? or is diagonal allowed?
        return this.getUnitRadiusIndexes(unit, unit.stats.rng, {include_enemy_units: true, include_empty: false})
    }
    getUnitMoveIndexes(unit) {
        return this.getUnitRadiusIndexes(unit, unit.stats.mov, {})
    }
    getUnitRadiusIndexes(unit, radius=1, {include_friendly_units=false, include_enemy_units=false, include_empty=true}) {
        const indexes = new Map([[unit.pos, radius]])
        for (let dt=radius ; dt>0 ; dt--) {
            for (let i of indexes.entries().filter(([i,d])=>d==dt).map(([i,d])=>i)) {
                const [x,y,z] = this.dimension.index_to_position(i)
                const pos_to_try = [[x+1,y],[x-1,y], [x,y+1],[x,y-1]]
                    .filter(([x,y])=>this.dimension.position_in_bounds(x,y))
                    .map   (([x,y])=>this.dimension.position_to_index(x,y))
                    .filter((i)=>!indexes.has(i))
                    .filter((i)=>{  // true == keep
                        const u = this.getUnit(i)
                        if (u) {
                            // TODO: more complexity here. Mounts? or Trees? or Walls?
                            const friend = unit.player_id == u.player_id
                            const enemy  = !friend
                            return (friend && include_friendly_units) || (enemy && include_enemy_units)
                        }
                        return include_empty
                    })
                    .forEach((i)=>indexes.set(i, dt-1))
            }
        }
        indexes.delete(unit.pos)
        return indexes
    }

    get state() {return this}
    set state(data) {
        this.dimension.dimensions = data.dimension.dimensions
        this.map_data = data.map_data
    }

}