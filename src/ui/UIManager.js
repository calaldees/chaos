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
        this.unit_selected_effects = []

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

    unselect = () => {
        // TODO - mark old selection as dirty
        for (let unit_selected_effect of this.unit_selected_effects) {
            unit_selected_effect.active = false
        }
        this.unit_selected_effects.length = 0
    }

    map_pressed = (i) => {
        //console.log('pressed', i)
        const unit = this.ui_map.game.map.getUnit(i)

        if (unit) {this.select_unit(unit)}
        if (!unit) {this.default_ui()}
    }

    ui_input_callback = (item) => {
        console.log('UIManager', item)
        if (item.action == 'escape') {this.default_ui()}
        if (item.unit) {this.select_unit(item.unit)}
    }

    default_ui = () => {
        this.unselect()
        this.ui = UIMoves
        const units = this.ui_map.game.registry.getUnitsForPlayerID(this.player.id)
        this.ui.updateItems(units)
    }

    select_unit = (unit) => {
        this.unselect()
        const select_effect = new SpriteEffect(sprites.cursor[3], COLOR.white)
        this.ui_map.addEffect(unit.pos, select_effect)
        this.unit_selected_effects.push(select_effect)

        const units = this.ui_map.game.registry.getUnitsForPlayerID(unit.player_id)
        for (let _unit of units) {
            this.ui_map.addEffect(_unit.pos, new InvertEffect(20))
        }

        const unit_move_indexes = this.ui_map.game.map.getUnitMoveIndexes(unit)
        for (const i of unit_move_indexes) {
            const move_sprite_effect = new HighlightEffect() // new SpriteEffect(sprites.cursor[4], COLOR.white)
            this.ui_map.addEffect(i, move_sprite_effect)
            this.unit_selected_effects.push(move_sprite_effect)
        }

        this.ui = UIStats
        this.ui.drawStats(unit.unit_type)
        this.ui.drawStatModifiers(unit)
    }
}