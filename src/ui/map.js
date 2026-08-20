import {COLOR} from '../gfx/color.js'
import {sprites} from '../gfx/sprites.js'  // just for mouse cursor graphic
import {drawFont_color, FONT_HEIGHT} from '../gfx/text.js'
import {GfxDispatch, BORDER_OFFSET_PX, CELL_SIZE_PX, i_to_xy} from '../gfx/gfx_dispatch.js'
import {GfxMap} from '../gfx/gfx_map.js'
import {GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect} from '../gfx/gfx_effects.js'

import {CanvasAnimationBase, xyFromMouseEvent} from '../gfx/animation_base.js'
import {drawBorder} from '../gfx/border.js'
import {logging} from '../log/logging.js'

const KEYS_ARROWS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])

export class UIMap extends CanvasAnimationBase {
    constructor() {
        super(...arguments)
        const c = this.context

        this.LOGGING_AREA_XY = [0, 176]  // needed for mouse events to activate logging actions
        logging.registerHandler("map", (level, message)=>{
            this.context.clearRect(...this.LOGGING_AREA_XY, this.w, FONT_HEIGHT)
            drawFont_color(this.context, message, ...this.LOGGING_AREA_XY)
        })

        drawBorder(c,0,0,this.w,this.h-FONT_HEIGHT,COLOR.blue)

        // Cursor - Mouse
        this.mouse_index = undefined
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse_index = this.d.position_to_index(...xyFromMouseEvent(e).map((i)=>Math.floor((i-BORDER_OFFSET_PX)/CELL_SIZE_PX)))
        }, true)
        // Cursor -Keys
        this.cursor_key_cooldown = 0

        this.cursor_index = undefined
        this.cursor_pressed = false
        this.cursor_effect = {}  // empty object for first run prevent null pointer
        this.cursor = sprites.cursor[0]

        // Events
        this.event_listeners = new Map()
    }
    get d() {return this.gfx_map.map_model.dimension}
    get game() {return this._game}
    set game(game) {
        this._game = game
        logging.info('game attached to MainUIThing')

        // Gfx Map
        this.gfx_map = new GfxMap(game.map)
        this.gfx_effects = new GfxEffects(game.map.dimension.size)
        this.gfx_dispatch = new GfxDispatch([this.gfx_map, this.gfx_effects])

        this.setRunning(true)
    }
    addEffect(i, gfx_effect) {
        this.gfx_dispatch.markDirty(i)
        this.gfx_effects.addEffect(i, gfx_effect)
    }
    loop(context, frame) {
        if (!this.gfx_map) {return}  // Temp to stop handling of active state. setRunning is called by the focus listener
        this.handle_input()
        this.gfx_dispatch.markDirty(
            ...this.gfx_map.dirtyIndexes(frame),
            ...this.gfx_effects.dirtyIndexes(frame),
        )
        this.gfx_effects.expireInactive()
        this.gfx_dispatch.drawDirty(context, frame)
        this.gfx_dispatch.resetDirtyIndexes()
    }
    handle_input() {
        if (!this.gfx_map) {return}  // Temp - See loop above

        let i
        // Mouse Index
        if (this.mouse_index >= 0) {
            i = this.mouse_index
            this.mouse_index = undefined
        }
        // Keyboard Index
        if (this.keys_pressed.intersection(KEYS_ARROWS).size) {
            this.cursor_key_cooldown += 1
            i = (this.cursor_index || 0)
            if (this.cursor_key_cooldown % 3 == 1) {
                i += (
                    (this.keys_pressed.has('ArrowLeft' )?           -1:0) +
                    (this.keys_pressed.has('ArrowRight')?            1:0) +
                    (this.keys_pressed.has('ArrowUp'   )?-this.d.width:0) +
                    (this.keys_pressed.has('ArrowDown' )? this.d.width:0) +
                    0
                )
                if (i<0 || i>=this.d.size) {
                    i = (this.cursor_index || 0)
                }
            }
        } else {
            this.cursor_key_cooldown = 0
        }
        // Button Pressed
        const pressed = (
            this.keys_pressed.has('mouse0') || this.keys_pressed.has('Enter') || this.keys_pressed.has(' ')
        )

        // Handle logging_area_click
        if (pressed && this.mouse_y >= this.LOGGING_AREA_XY[1]) {
            for (const f of this.event_listeners.get('logging_clicked')) {f()}
            return
        }

        if ((i == undefined && !pressed) || (this.cursor_index == i && this.cursor_pressed == pressed)) {return}

        // Mouse moved - redraw
        this.cursor_index = i==undefined ? this.cursor_index : i
        this.cursor_pressed = pressed
        this.cursor_effect.active = false  // expire the existing effect/cursor
        this.cursor_effect = new SpriteEffect(this.cursor)
        this.gfx_effects.addEffect(this.cursor_index, this.cursor_effect)

        // Trigger Events
        if (this.cursor_pressed) {
            for (const f of this.event_listeners.get('map_clicked')) {f(this.cursor_index)}
        }
    }
    addEventListener(event_name, func) {
        if (!this.event_listeners.has(event_name)) {
            this.event_listeners.set(event_name, new Array())
        }
        this.event_listeners.get(event_name).push(func)
    }
    removeEventListener(event_name, func) {
        throw new Error("not implemented")
    }
}
