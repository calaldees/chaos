import { COLOR, shiftImage } from '../gfx/color.js'

import {unit_data} from '../data/unit_data.js'
import {gfx_units} from '../gfx/units.js'


export class UIStats {
    constructor(ui) {
        console.assert(ui.constructor.name == "UI", 'must pass ui obj')
        this.ui = ui
    }

    drawStats(unit_type) {
        const ui = this.ui
        const u = unit_data[unit_type]

        ui.clear()
        ui.setBorder(COLOR.green_bright, undefined, 16)

        const stat = (property) => `${u.properties[property]}`

        // Stats
        ui.drawFont(u.name, 3, 0, COLOR.yellow)
        ui.drawFont("(Chaos ?)", 16, 0, COLOR.magenta)

        ui.drawFont("Combat=", 3, 2, COLOR.cyan)
        ui.drawFont(stat('com'), 10, 2, COLOR.white)

        ui.drawFont("Ranged Combat=", 3, 3, COLOR.cyan)
        ui.drawFont(stat('rcm'), 17, 3, COLOR.white)
        ui.drawFont("Range=", 19, 3, COLOR.cyan)
        ui.drawFont(stat('rng'), 25, 3, COLOR.white)

        ui.drawFont("Defense=", 3, 4, COLOR.cyan)
        ui.drawFont(stat('def'), 11, 4, COLOR.white)

        ui.drawFont("Movement Allowance=", 3, 5, COLOR.cyan)
        ui.drawFont(stat('mnv'), 22, 5, COLOR.white)

        ui.drawFont("Maneuver Rating=", 3, 6, COLOR.cyan)
        ui.drawFont(stat('mnv'), 19, 6, COLOR.white)

        ui.drawFont("Magic Resistance=", 3, 7, COLOR.cyan)
        ui.drawFont(stat('res'), 20, 7, COLOR.white)

        // Extra - draw the unit in correct color
        this.ui.c.drawImage(
            shiftImage(...gfx_units[unit_type].sprite_and_color(0)),
            ...this.ui.i_to_xy(0)
        )

    }
}