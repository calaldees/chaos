import { COLOR } from '../gfx/color.js'
import { sprites } from '../gfx/sprites.js'  // just for mouse cursor graphic
import { gfx_units } from '../gfx/units.js'

import { logging } from '../log/logging.js'
import { GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect } from '../gfx/gfx_effects.js'

import { Action, ActionType } from '../model/actions.js'

import { UIInputBase } from './ui_input_base.js'
import { UIMap } from './map.js'
import { UIUnitActions, unitActionUIItems } from './unit_actions.js'
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
        //this.input_mode = undefined

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
        const args = [this.ui_input_base]
        if (UIClass.name == UIUnitActions.name) {args.push(this.actions)}
        this._active_ui = new UIClass(...args)
        return this._active_ui
    }

    addSelectedEffect(i, effect) {
        this.ui_map.addEffect(i, effect)
        this.unit_selected_effects.push(effect)
    }

    unselect = () => {
        // this.input_mode = undefined
        this.unit_selected = undefined
        // TODO - mark old selection as dirty?
        for (let effect of this.unit_selected_effects) {effect.active = false}
        this.unit_selected_effects.length = 0
    }

    map_pressed = (i) => {
        const unit = this.ui_map.game.map.getUnit(i)

        if (!this.unit_selected && !unit) {this.default_ui(); return}
        if (unit && this.unit_selected != unit) {this.unit_select(unit.unit_id); return}

        //if (this.input_mode == ActionType.MOVE) {
        if (this.unit_selected && this.unit_selected.player_id == this.actions.player.id && !unit) {
            const unit_move_indexes = this.actions.getActionTypeToIndexes(this.unit_selected.unit_id).get(ActionType.MOVE)
            if (unit_move_indexes.has(i)) {
                this.actions.addAction(
                    new Action(this.actions.player.id, this.unit_selected.unit_id, ActionType.MOVE, i, undefined)
                )
                this.actions.action_effects.forEach(([i,effect])=>this.ui_map.addEffect(i,effect))

                // TODO: update attack and range_attack target index's
                return
            }
        }
        //}
        this.unselect()
    }

    ui_input_callback = (item) => {
        console.log('UIManager', item)
        if (item.action == 'escape') {this.default_ui(); return}
        if (item.action == 'log'   ) {this.logging_pressed(); return}
        if (item.action == 'unit'  ) {this.unit_select(item.unit_id); return}
        if (item.action == ActionType.MOVE) {
            //this.unit_select(item.unit_id)
            //this.input_mode = ActionType.MOVE
        }
    }

    default_ui = () => {
        this.unselect()
        this.ui = UIUnitActions
        this.ui.updateItems(this.actions.units)
    }

    unit_select = (unit_id) => {
        this.unselect()
        const unit = this.ui_map.game.registry.units[unit_id]
        this.unit_selected = unit

        this.addSelectedEffect(unit.pos, new SpriteEffect(sprites.cursor[3], COLOR.white))

        const units = this.ui_map.game.registry.getUnitsForPlayerID(unit.player_id)
        for (let _unit of units) {
            this.ui_map.addEffect(_unit.pos, new InvertEffect(20))
        }

        const ll = new Map([
            [ActionType.MOVE, COLOR.yellow],
            [ActionType.ATTACK, COLOR.red],
            [ActionType.RANGEATTACK, COLOR.magenta],
            [ActionType.USE, COLOR.green],
        ])
        for (let [action_type, indexes] of this.actions.getActionTypeToIndexes(unit_id)) {
            for (const [i, radius] of indexes) {
                const colour = ll.get(action_type)
                //console.log(i, colour)
                this.addSelectedEffect(i, new HighlightEffect(colour))
            }
        }

        this.ui = UIUnitStats
        this.ui.drawStats(unit.unit_type)
        this.ui.drawStatModifiers(unit)
        if (unit.player_id == this.actions.player.id) {
            const action_to_key = new Map([
                [ActionType.MOVE, '1'],
                [ActionType.ATTACK, '2'],
                [ActionType.RANGEATTACK, '3'],
                [ActionType.SPELL, '4'],
            ])
            this.ui.ui.items = unitActionUIItems(251, this.actions.actionUnitState(unit), action_to_key, unit.unit_id)
        }
    }

}