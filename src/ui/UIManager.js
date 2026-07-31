// Keep track of Map, Menu, Effects and Cursor

import { UIMoves } from '../ui/moves.js'
import { UIStats } from '../ui/stats.js'

export class UIManager {
    constructor(map_ui, input_ui) {
        console.assert(map_ui.constructor.name == 'MapUI')
        console.assert(input_ui.constructor.name == 'UI')
        this.map_ui = map_ui
        this.input_ui = input_ui

        this.map_ui.addEventListener('pressed', this.map_pressed)
    }
    // new UIMoves(input_ui)

    map_pressed = (i) => {
        console.log('pressed', i)
        const unit = this.map_ui.game.map.getUnit(i)
        if (unit) {
            const stats_ui = new UIStats(this.input_ui)
            stats_ui.drawStats(unit.unit_type)
            stats_ui.drawStatModifiers(unit)
        }
    }
}