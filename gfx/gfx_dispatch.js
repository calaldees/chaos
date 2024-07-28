import {range, Dimension} from '../core.js'


// These are duplicated in 'map' and 'map_model' - I am sad at this
export const BORDER_OFFSET_PX = 8  // Probably needs to be passed rather than a constant? Maybe the context can be transposed?
export const CELL_SIZE_PX = 16
export const dimension = new Dimension(15, 10)
export function i_to_xy(i) {
    return [...dimension.index_to_position(i)].map(j=>Math.floor(j*CELL_SIZE_PX)+BORDER_OFFSET_PX).slice(0,2)
}

export class GfxDispatch {
    constructor(gfx_layers) {
        // gfx_layers are objects that implement `draw(i)` and ``
        this.gfx_layers = gfx_layers
        this.clearDirty()
        //this.dirty_indexes = new Set()
    }
    draw(c, frame) {
        for (let i of range(dimension.size)) {
            this._drawIndex(c, frame, i)
        }
    }
    drawDirty(c, frame) {
        for (let i of this.dirty_indexes){
            this._drawIndex(c, frame, i)
        }
    }
    _drawIndex(c, frame, i){
        c.save()
        c.translate(...i_to_xy(i))
        c.clearRect(0,0,CELL_SIZE_PX,CELL_SIZE_PX)
        for (let gfx_layer of this.gfx_layers) {
            gfx_layer.draw(c, frame, i)
        }
        c.restore()
    }
    markDirty(...i) {
        this.dirty_indexes = new Set([...this.dirty_indexes, ...i])
    }
    clearDirty() {
        this.dirty_indexes = new Set()
    }
}