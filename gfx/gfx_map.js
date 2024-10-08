import { range } from '../core.js'

import { shiftImage } from "./color.js"
import { gfx_units } from "./units.js"

const CELL_SIZE_PX = 16


export class GfxMap {
    constructor(map_model) {
        this.map_model = map_model
    }

    * _indexed_gfx_units() {
        for (let i of range(this.map_model.dimension.size)) {
            const unit = this.map_model.getUnit(i)
            if (!unit) {continue}
            yield [i, gfx_units[unit.template.name], unit]
        }
    }

    draw(c, frame, i) {
        const unit = this.map_model.getUnit(i)
        if (!unit) {return}
        const gfx_unit = gfx_units[unit.template.name]

        const sprite_color_tuple = gfx_unit[unit.status.has("corpse") ? 'sprite_and_color_corpse':'sprite_and_color'](frame)
        sprite_color_tuple[1] = unit.getAnimColorsOverride(frame) || sprite_color_tuple[1]  // UnitModel may override color (e.g. a wizard/player has selected their color) or maybe undead versions of some monsters can be cyan?
        const image = shiftImage(...sprite_color_tuple, unit.flip)
        if (gfx_unit.color_background()) {
            c.fillStyle = gfx_unit.color_background()
            c.fillRect(0, 0, CELL_SIZE_PX, CELL_SIZE_PX)
        }
        c.drawImage(image, 0, 0)
    }

    // Dirty Animation ---------------------------------------------------------

    * dirtyIndexes(frame) {
        for (let [i, gfx_unit, unit] of this._indexed_gfx_units()) {
            if (gfx_unit.isDirty(frame) && !unit.status.has("corpse")) {
                yield i
            }
        }
    }

}