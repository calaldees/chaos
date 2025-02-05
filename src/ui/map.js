import {COLOR} from '../gfx/color.js'
import {sprites} from '../gfx/sprites.js'  // just for mouse cursor graphic
import {drawFont_color} from '../gfx/text.js'
import {GfxDispatch, BORDER_OFFSET_PX, CELL_SIZE_PX, i_to_xy} from '../gfx/gfx_dispatch.js'
import {GfxMap} from '../gfx/gfx_map.js'
import {GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect} from '../gfx/gfx_effects.js'

import {CanvasAnimationBase} from '../gfx/animation_base.js'
import {drawBorder} from '../gfx/border.js'
import {logging} from '../log/logging.js'


export class MapUI extends CanvasAnimationBase {
    constructor() {
        super(...arguments)
        const c = this.context

        logging.registerHandler("map", (level, message)=>{
            const message_xy = [0, 176]
            this.context.clearRect(...message_xy, this.w, this.h)
            drawFont_color(this.context, message, ...message_xy)
        })

        drawBorder(c,0,0,this.w,this.h-16,COLOR.blue)

        // Mouse
        this.mouse_index = undefined
        this.mouse_effect = {}
        this.cursor = sprites.cursor[0]
    }
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
    loop(context, frame) {
        if (!this.gfx_map) {return}  // Temp to stop handling of active state. setRunning is called by the focus listener
        this.handle_mouse()
        this.gfx_dispatch.markDirty(
            ...this.gfx_map.dirtyIndexes(frame),
            ...this.gfx_effects.dirtyIndexes(frame),
        )
        this.gfx_effects.expireInactive()
        this.gfx_dispatch.drawDirty(context, frame)
        this.gfx_dispatch.resetDirtyIndexes()
    }
    handle_mouse() {
        if (!this.gfx_map) {return}  // Temp - See loop above
        const i = this.gfx_map.map_model.dimension.position_to_index(...[this.mouse_x,this.mouse_y].map((i)=>Math.floor((i-BORDER_OFFSET_PX)/CELL_SIZE_PX)))
        if (this.mouse_index == i) {return}
        // console.log('mouse_index', i)
        // Mouse moved - redraw
        this.gfx_dispatch.markDirty(this.mouse_index || 0, i)
        this.mouse_index = i
        this.mouse_effect.active = false
        this.mouse_effect = new SpriteEffect(this.cursor)
        this.gfx_effects.addEffect(this.mouse_index, this.mouse_effect)
    }

}
