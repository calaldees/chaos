// Keep track of Map, Menu, Effects and Cursor
import {COLOR} from '../gfx/color.js'
import {sprites} from '../gfx/sprites.js'  // just for mouse cursor graphic

import {GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect} from '../gfx/gfx_effects.js'

import { UIMoves } from '../ui/moves.js'
import { UIStats } from '../ui/stats.js'

export class UIManager {
    constructor(map_ui, input_ui, player) {
        console.assert(map_ui.constructor.name == 'MapUI')
        console.assert(input_ui.constructor.name == 'UI')
        this.map_ui = map_ui
        this.input_ui = input_ui
        this.player = player

        this.map_ui.addEventListener('pressed', this.map_pressed)
        this.effect_unit_selected = {}
    }

    map_pressed = (i) => {
        //console.log('pressed', i)
        this.effect_unit_selected.active = false  // TODO - mark old selection as dirty
        const unit = this.map_ui.game.map.getUnit(i)

        if (unit) {
            this.effect_unit_selected = new SpriteEffect(sprites.cursor[3], COLOR.green_bright)
            this.map_ui.gfx_effects.addEffect(i, this.effect_unit_selected)

            const stats_ui = new UIStats(this.input_ui)
            stats_ui.drawStats(unit.unit_type)
            stats_ui.drawStatModifiers(unit)
            return
        }
        if (!unit) {
            this.input_ui.clear()
            const main_ui = new UIMoves(this.input_ui)
            //units = this.map_ui.game.registry.getUnitsForPlayerID()
            main_ui.updateItems
        }
    }
}