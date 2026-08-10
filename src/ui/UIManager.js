// Keep track of Map, Menu, Effects and Cursor
import {COLOR} from '../gfx/color.js'
import {sprites} from '../gfx/sprites.js'  // just for mouse cursor graphic

import { logging } from '../log/logging.js'
import {GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect} from '../gfx/gfx_effects.js'

import { UIMoves } from '../ui/moves.js'
import { UIStats } from '../ui/stats.js'
import { UILogging } from '../ui/logging.js'

export class UIManager {
    constructor(map_ui, input_ui, player) {
        console.assert(map_ui.constructor.name == 'MapUI')
        console.assert(input_ui.constructor.name == 'UI')
        this.map_ui = map_ui  // TODO: immutable properties?
        this.input_ui = input_ui
        this.player = player

        logging.registerHandler("logging_ui", this.logging_event)

        this.map_ui.addEventListener('map_clicked', this.map_pressed)
        this.map_ui.addEventListener('logging_clicked', this.logging_pressed)
        this.effect_unit_selected = {}

        this._active_ui = undefined
        this.map_pressed()  // trigger the default UI
    }

    logging_pressed = () => {
        this.ui = UILogging
        this.logging_event()
    }
    logging_event = (level, message) => {
        if (this.ui.constructor.name == 'UILogging') {
            const messages = logging.history.slice(
                Math.max(0,logging.history.length-this.input_ui.rows),
                Math.max(0,logging.history.length-1),
            ).map(([timestamp,level,message])=>message)
            this.ui.render_messages(messages)
        }
    }

    get ui() {return this._active_ui}
    set ui(UIClass) {
        // TODO: enforce UIClass type? // damn dirty typeless js
        this.input_ui.clear()
        this._active_ui = new UIClass(this.input_ui)
        return this._active_ui
    }

    map_pressed = (i) => {
        //console.log('pressed', i)
        this.effect_unit_selected.active = false  // TODO - mark old selection as dirty
        const unit = this.map_ui.game.map.getUnit(i)

        if (unit) {
            this.effect_unit_selected = new SpriteEffect(sprites.cursor[3], COLOR.white)
            this.map_ui.gfx_effects.addEffect(i, this.effect_unit_selected)


            this.ui = UIStats
            this.ui.drawStats(unit.unit_type)
            this.ui.drawStatModifiers(unit)

            return
        }
        if (!unit) {
            this.ui = UIMoves

            const units = this.map_ui.game.registry.getUnitsForPlayerID()
            this.ui.updateItems(units)
        }
    }
}