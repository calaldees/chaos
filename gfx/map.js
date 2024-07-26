import { enumerate} from '../core.js'

import { COLOR, shiftImage } from "./color.js"
import { gfx_units } from "./units.js"

const CORPSE_FRAME = -1
export const BORDER_OFFSET_PX = 8  // Probably needs to be passed rather than a constant? Maybe the context can be transposed?
export const CELL_SIZE_PX = 16


export class GfxMap {
    constructor(map_model) {
        this.map_model = map_model
    }

    * _indexed_gfx_units() {
        for (let [i, unit] of enumerate(this.map_model.data)) {
            if (!unit) {continue}
            yield [i, gfx_units[unit.template.name], unit]
        }
    }

    draw(c) {
        for (let _ of this._indexed_gfx_units()) {
            this._drawGfxUnit(c, ..._)
        }
    }

    markDirty(i) {
        // todo
    }

    // Dirty Animation ---------------------------------------------------------

    * _dirtyGfxUnits(frame) {
        for (let _ of this._indexed_gfx_units()) {
            const [i, gfx_unit, unit] = _
            if (gfx_unit.isDirty(frame) && !unit.status.has("corpse")) {
                yield _
            }
        }
    }

    drawDirtyGfxUnits(c, frame) {
        for (let _ of this._dirtyGfxUnits(frame)) {
            this._drawGfxUnit(c, ..._, frame)
        }
    }

    _drawGfxUnit(c, i, gfx_unit, unit, frame=0) {  // TODO: refactor _indexed_gfx_units for this
        const sprite_color = gfx_unit[unit.status.has("corpse") ? 'sprite_and_color_corpse':'sprite_and_color'](frame)
        const image = shiftImage(...sprite_color, unit.flip)
        const [_x, _y] = [...this.map_model.dimension.index_to_position(i)].map(j=>Math.floor(j*CELL_SIZE_PX)+BORDER_OFFSET_PX)
        c.fillStyle = gfx_unit.color_background()
        c.fillRect(_x, _y, 16, 16)
        c.drawImage(image, _x, _y)
    }

}