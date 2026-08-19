import { isNumber, Dimension, range, enumerate, mod } from "../core.js"


// failed experiment
function generate_movement_vectors(dw) {
    const max_move = Math.floor(dw/2)
    // dw == the width of the map/grid
    const vectors = [...range(max_move)].map((r)=>
        new Set([...range(r+2)].flatMap((i)=>{
            const ir = i-(r+1)
            return [i*dw+ir,i*dw-ir,-i*dw+ir,-i*dw-ir]
        }))
    )
    vectors.unshift(new Set())  // Add a `0` index, because no vectors for 0 move

    // Combine all previous vectors for each mov distance
    let all_vectors = new Set()
    for (const [i, v] of enumerate(vectors)) {
        all_vectors = all_vectors.union(v)
        vectors[i] = new Set(all_vectors)
    }
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
// failed experiment
function generate_overflow_indexes_for_cols(dimension) {
    const dw = dimension.width
    const dh = dimension.height
    const max_move = Math.floor(dw/2)
    const indexes_per_col = new Map(
        [...range(max_move,-max_move)].map((col_offset)=>{
            const col = mod(col_offset,dw)
            return [col, new Set([...range(dh).map((row)=>(row*dw)+col)])]
        })
    )
    // col_lookup
    /*
    col = 0..max_move
    0 -> (dw-max_move+col)..dw [union-all]
    1 -> dw-max_move+col..dw
    2 -> dw-max_move+col..dw

    3 -> []

    col = dw-max_move..dw
    4 -> 0..dw-col
    5 -> ..
    6 -> 0..
    */
    const union_cols = (acc,_col)=> acc.union(indexes_per_col.get(_col))
    const col_lookup = new Map([...range(dw).map((col)=>{
        const dw_max_move = dw-max_move
        if (col<=max_move) {
            return [col, [...range(dw,dw_max_move+col)].reduce(union_cols, new Set())]
        }
        if (col>=dw_max_move) {
            // diz iz fooked
            return [col, [...range(dw_max_move-col,0)].reduce(union_cols, new Set())]
        }
        return [col, new Set()]
    })])
    return col_lookup
}

// ----



export class MapChaos {
    constructor(registry) {
        if (!registry.units) {throw TypeError()}
        Object.defineProperty(this, "registry", {writable: false, enumerable: false, value: registry})
        this.dimension = new Dimension(15, 10)
        this.map_data = new Array(this.dimension.size)
        this.movement_vectors = generate_movement_vectors(this.dimension.width)
        this.overflow_vectors = generate_overflow_indexes_for_cols(this.dimension)
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
    getUnitMoveIndexes(unit) {
        const mov = unit.stats.mov
        const mov_indexes = new Map([[unit.pos, mov]])
        for (let dt=mov ; dt>0 ; dt--) {
            for (let i of mov_indexes.entries().filter(([i,d])=>d==dt).map(([i,d])=>i)) {
                const [x,y,z] = this.dimension.index_to_position(i)
                const pos_to_try = [[x+1,y],[x-1,y], [x,y+1],[x,y-1]]
                    .filter(([x,y])=>this.dimension.position_in_bounds(x,y))
                    .map   (([x,y])=>this.dimension.position_to_index(x,y))
                    .filter((i)=>!this.getUnit(i))
                    .filter((i)=>!mov_indexes.has(i))
                    .forEach((i)=>mov_indexes.set(i, dt-1))
            }
        }
        return mov_indexes.keys()
    }
    getUnitMoveIndexesOLD(unit) {
        const mov = unit.stats.mov
        const pos = unit.pos
        const [x,y,z] = this.dimension.index_to_position(pos)
        const overflow_vectors = this.overflow_vectors.get(x)
        return [...this.movement_vectors[mov]]
            .map((i)=>i+pos)
            .filter((i)=>i>=0 && i<this.dimension.size)
            .filter((i)=>!overflow_vectors.has(i))
    }

    get state() {return this}
    set state(data) {
        this.dimension.dimensions = data.dimension.dimensions
        this.map_data = data.map_data
    }

}