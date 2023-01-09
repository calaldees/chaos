import { enumerate} from '../core.js'

import { COLOR, shiftImage } from "./color.js"
import { gfx_units } from "./units.js"

export class GfxMap {
    constructor(c, map_model) {
        this.c = c
        this.map_model = map_model
    }

    * _indexed_gfx_units() {
        for (let [i, unit] of enumerate(this.map_model.data)) {
            if (!unit) {continue}
            yield [i, gfx_units[unit.template.name], unit]
        }
    }

    draw() {
        this.drawDirtyGfxUnits(0)  // TODO? should draw corpses
    }

    // Dirty Animation ---------------------------------------------------------

    * _dirtyGfxUnits(frame) {
        for (let [i, gfx_unit, unit] of this._indexed_gfx_units()) {
            if (gfx_unit.isDirty(frame)) {  // TODO unit not dead?
                yield [i, gfx_unit]
            }
        }
    }

    _drawGfxUnit(i, gfx_unit, frame) {  // TODO: refactor _indexed_gfx_units for this
        const [_x, _y] = [...this.map_model.dimension.index_to_position(i)].map(_=>Math.floor(_*16)+8)
        this.c.fillStyle = COLOR.black; this.c.fillRect(_x, _y, 16, 16);
        this.c.drawImage(shiftImage(...gfx_unit.sprite_color(frame)), _x, _y)
    }

    drawDirtyGfxUnits(frame) {
        for (let [i, gfx_unit] of this._dirtyGfxUnits(frame)) {
            this._drawGfxUnit(i, gfx_unit, frame)
        }
    }

}