import { COLOR } from '../gfx/color.js'
import { sprites } from '../gfx/sprites.js'  // just for mouse cursor graphic

import { logging } from '../log/logging.js'
import { GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect } from '../gfx/gfx_effects.js'


import { UIInputBase } from './ui_input_base.js'
import { UIMap } from './map.js'
import { UIMoves } from './moves.js'
import { UIStats } from './stats.js'
import { UILogging } from './logging.js'

export class UIManager {
    /*
    Keep track of Map, Menu, Effects and Cursor
    Player input state
    */
    constructor(ui_map, ui_input_base, player) {
        console.assert(ui_map.constructor.name == UIMap.name)
        console.assert(ui_input_base.constructor.name == UIInputBase.name)
        Object.defineProperty(this, "ui_map"       , {writable: false, enumerable: true, value: ui_map       })
        Object.defineProperty(this, "ui_input_base", {writable: false, enumerable: true, value: ui_input_base})
        this.player = player

        this.ui_input_base.callback = this.ui_input_callback

        logging.registerHandler("logging_ui", this.logging_event)

        this.ui_map.addEventListener('map_clicked', this.map_pressed)
        this.ui_map.addEventListener('logging_clicked', this.logging_pressed)
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
                Math.max(0,logging.history.length-this.ui_input_base.rows),
                Math.max(0,logging.history.length-1),
            ).map(([timestamp,level,message])=>message)
            this.ui.render_messages(messages)
        }
    }

    get ui() {return this._active_ui}
    set ui(UIClass) {
        // TODO: enforce UIClass type? // damn dirty typeless js
        this.ui_input_base.clear()
        this._active_ui = new UIClass(this.ui_input_base)
        return this._active_ui
    }

    map_pressed = (i) => {
        //console.log('pressed', i)
        this.effect_unit_selected.active = false  // TODO - mark old selection as dirty
        const unit = this.ui_map.game.map.getUnit(i)

        if (unit) {
            this.select_unit(unit)
        }
        if (!unit) {
            this.ui = UIMoves
            const units = this.ui_map.game.registry.getUnitsForPlayerID(this.player.id)
            this.ui.updateItems(units)
        }
    }

    ui_input_callback = (item) => {
        console.log('UIManager', item)
        if (item.unit) {this.select_unit(item.unit)}
    }

    select_unit = (unit) => {
        this.effect_unit_selected = new SpriteEffect(sprites.cursor[3], COLOR.white)
        this.ui_map.gfx_effects.addEffect(unit.pos, this.effect_unit_selected)

        const units = this.ui_map.game.registry.getUnitsForPlayerID(unit.player_id)
        for (let _unit of units) {
            this.ui_map.gfx_effects.addEffect(_unit.pos, new InvertEffect(20))
        }

        this.ui = UIStats
        this.ui.drawStats(unit.unit_type)
        this.ui.drawStatModifiers(unit)
    }
}