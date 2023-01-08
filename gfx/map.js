import { enumerate} from '../core.js'

import { COLOR, shiftImage } from "./color.js"
import { gfx_units } from "./units.js"

export class GfxMap {
    constructor(c, map_model) {
        this.c = c
        this.map_model = map_model
    }

    * _dirtyGfxUnits(frame) {
        for (let [i, unit] of enumerate(this.map_model.data)) {
            if (!unit) {continue}
            const gfx_unit = gfx_units[unit.template.name]  // lookup graphics for this unit.name
            if (gfx_unit.isDirty(frame)) {
                yield [this.map_model.dimension.index_to_position(i), gfx_unit]
            }
        }
    }

    _drawGfxUnit(gfx_unit, frame, x, y) {
        const [_x, _y] = [Math.floor(x*16)+8, Math.floor(y*16)+8]
        this.c.fillStyle = COLOR.black; this.c.fillRect(_x, _y, 16, 16);
        this.c.drawImage(shiftImage(...gfx_unit.sprite_color(gfx_unit.unit_frame(frame))), _x, _y)
    }

    drawDirtyGfxUnits(frame) {
        for (let [position, gfx_unit] of this._dirtyGfxUnits(frame)) {
            this._drawGfxUnit(gfx_unit, frame, ...position)
            //drawUnit(map.getUnit(3,3,1), frame, ...map.dimension.index_to_position((frame)%150))
        }
    }
}