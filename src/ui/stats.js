import { COLOR, shiftImage } from '../gfx/color.js'

import {unit_data} from '../data/unit_data.js'
import {gfx_units} from '../gfx/units.js'

import { UIInputBase } from './ui_input_base.js'

export class UIStats {
    constructor(ui) {
        console.assert(ui.constructor.name == UIInputBase.name, 'must pass ui obj')
        this.ui = ui
    }

    drawStats(unit_type) {
        const ui = this.ui
        const u = unit_data[unit_type]

        ui.clear()
        ui.setBorder(COLOR.green_bright, undefined, 16)

        const stat = (k) => `${u.stats[k]}`

        // Stats
        ui.drawFont(u.name, 3, 0, COLOR.yellow)
        ui.drawFont("(Chaos ?)", 16, 0, COLOR.magenta)

        // Status/Buffs/Mounts?
        //ui.drawFont("SHADOW", 3, 1, COLOR.?)       // Buff to wizard?
        //ui.drawFont("(CROCODILE)", 3, 1, COLOR.?)  // engulfed by Blob?

        ui.drawFont("Combat=", 3, 2, COLOR.cyan)
        ui.drawFont(stat('com'), 10, 2, COLOR.white)

        ui.drawFont("Ranged Combat=", 3, 3, COLOR.cyan)
        ui.drawFont(stat('rcm'), 17, 3, COLOR.white)
        ui.drawFont("Range=", 19, 3, COLOR.cyan)
        ui.drawFont(stat('rng'), 25, 3, COLOR.white)

        ui.drawFont("Defence=", 3, 4, COLOR.cyan)
        ui.drawFont(stat('def'), 11, 4, COLOR.white)

        ui.drawFont("Movement Allowance=", 3, 5, COLOR.cyan)
        ui.drawFont(stat('mov'), 22, 5, COLOR.white)

        ui.drawFont("Manoeuvre Rating=", 3, 6, COLOR.cyan)
        ui.drawFont(stat('mnv'), 20, 6, COLOR.white)

        ui.drawFont("Magic Resistance=", 3, 7, COLOR.cyan)
        ui.drawFont(stat('res'), 20, 7, COLOR.white)

        const isWizard = false  // TODO
        if (isWizard) {
            ui.drawFont("Spells=", 3, 8, COLOR.yellow)
            ui.drawFont(stat('???'), 10, 8, COLOR.yellow)

            ui.drawFont("Ability=", 13, 8, COLOR.yellow)
            ui.drawFont(stat('???'), 22, 8, COLOR.yellow)
        }

        // TODO: draw the unit in correct color for this unit status
        this.ui.drawUnit(unit_type, 0, 0)
    }

    drawStatModifiers(unit) {
        for (let [stat_key, row, col] of [
            ['com', 11, 2],
            ['rcm', 18, 3],
            ['rng', 26, 3],
            ['def', 12, 4],
            ['mov', 23, 5],
            ['mnv', 21, 6],
            ['res', 21, 7],
        ]) {
            const val = unit.stat_modifiers[stat_key]
            if (val) {
                this.ui.drawFont(`+${val}`, row, col, COLOR.yellow)
            }
        }
    }
}