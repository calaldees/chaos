import { COLOR } from '../gfx/color.js'
import { sprites } from '../gfx/sprites.js'  // just for mouse cursor graphic
import { gfx_units } from '../gfx/units.js'

import { logging } from '../log/logging.js'
import { GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect } from '../gfx/gfx_effects.js'

import { Action, ActionType } from '../model/actions.js'

import { UIInputBase } from './ui_input_base.js'
import { UIMap } from './map.js'
import { UIUnitActions } from './unit_actions.js'
import { UIUnitStats } from './unit_stats.js'
import { UILogging } from './logging.js'
import { QueuedActionManager } from './actions.js'

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
        this.actions = new QueuedActionManager(ui_map.game, player)

        this.ui_input_base.callback = this.ui_input_callback

        logging.registerHandler("logging_ui", this.logging_event)

        this.ui_map.addEventListener('map_clicked', this.map_pressed)
        this.ui_map.addEventListener('logging_clicked', this.logging_pressed)

        this.unit_selected = undefined
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

    addSelectedEffect(i, effect) {
        this.ui_map.addEffect(i, effect)
        this.unit_selected_effects.push(effect)
    }

    unselect = () => {
        this.unit_selected = undefined
        // TODO - mark old selection as dirty?
        for (let unit_selected_effect of this.unit_selected_effects) {
            unit_selected_effect.active = false
        }
        this.unit_selected_effects.length = 0
    }

    map_pressed = (i) => {
        const unit = this.ui_map.game.map.getUnit(i)
        if (!this.unit_selected && !unit) {this.default_ui(); return}
        if (unit && this.unit_selected != unit) {this.unit_select(unit); return}
        if (this.unit_selected && !unit) {
            const unit_move_indexes = this.ui_map.game.map.getUnitMoveIndexes(this.unit_selected)
            if (unit_move_indexes.has(i)) {
                this.actions.addAction(
                    new Action(ActionType.MOVE, this.actions.player.id, this.unit_selected.unit_id, i, undefined)
                )
                this.render_actions()
                return
            }
        }
        this.unselect()
    }

    ui_input_callback = (item) => {
        console.log('UIManager', item)
        if (item.action == 'escape') {this.default_ui()}
        if (item.unit) {this.unit_select(item.unit)}
    }

    default_ui = () => {
        this.unselect()
        this.ui = UIUnitActions
        this.ui.updateItems(this.actions.units)
    }

    unit_select = (unit) => {
        this.unselect()
        this.unit_selected = unit

        this.addSelectedEffect(unit.pos, new SpriteEffect(sprites.cursor[3], COLOR.white))

        const units = this.ui_map.game.registry.getUnitsForPlayerID(unit.player_id)
        for (let _unit of units) {
            this.ui_map.addEffect(_unit.pos, new InvertEffect(20))
        }

        const unit_move_indexes = this.ui_map.game.map.getUnitMoveIndexes(unit)
        for (const i of unit_move_indexes.keys()) {
            this.addSelectedEffect(i, new HighlightEffect())
        }

        this.ui = UIUnitStats
        this.ui.drawStats(unit.unit_type)
        this.ui.drawStatModifiers(unit)
    }

}