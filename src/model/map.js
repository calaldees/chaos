import { isNumber, Dimension, range } from "../core.js"


function generate_movement_vectors(dw, max_mov=6) {
    // dw == the width of the map/grid
    const vectors = [...range(max_mov)].map((r)=>
        new Set([...range(r+2)].flatMap((i)=>{
            const ir = i-(r+1)
            return [i*dw+ir,i*dw-ir,-i*dw+ir,-i*dw-ir]
        }))
    )
    // TODO: combine all previous vectors with next vector set
    return vectors
        /*
        // Old manual creation of vectors to see the pattern
        this.vectors = [
            new Set([  // 1
                0*dw+1,0*dw-1,-0*dw+1,-0*dw-1,
                1*dw+0,1*dw-0,-1*dw+0,-1*dw-0,
            ]),
            new Set([ // 2
                0*dw+2,0*dw-2,-0*dw+2,-0*dw-2,
                1*dw+1,1*dw-1,-1*dw+1,-1*dw-1,
                2*dw+0,2*dw-0,-2*dw+0,-2*dw-0,
            ]),
            new Set([ // 3
                0*dw+3,0*dw-3,-0*dw+3,-0*dw-3,
                1*dw+2,1*dw-2,-1*dw+2,-1*dw-2,
                2*dw+1,2*dw-1,-2*dw+1,-2*dw-1,
                3*dw+0,3*dw-0,-3*dw+0,-3*dw-0,
            ]),
            new Set([ // 4
                0*dw-4,0*dw+4,-0*dw+4,-0*dw-4,
                1*dw-3,1*dw+3,-1*dw+3,-1*dw-3,
                2*dw-2,2*dw+2,-2*dw+2,-2*dw-2,
                3*dw-1,3*dw+1,-3*dw+1,-3*dw-1,
                4*dw-0,4*dw-0,-4*dw+0,-4*dw+0,
            ]),
        ]
        */
}


export class Map {
    constructor(registry) {
        if (!registry.units) {throw TypeError()}
        Object.defineProperty(this, "registry", {writable: false, enumerable: false, value: registry})
        this.dimension = new Dimension(15, 10)
        this.map_data = new Array(this.dimension.size)
        this.movement_vectors = generate_movement_vectors(this.dimension.width)
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


    get state() {return this}
    set state(data) {
        this.dimension.dimensions = data.dimension.dimensions
        this.map_data = data.map_data
    }

}