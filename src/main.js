import {enumerate} from './core.js'
import {loadImage, loadImages} from './gfx/image_decode.js'
import {drawBorder} from './gfx/border.js'
import {shiftImage, COLOR} from './gfx/color.js'
import {drawFont_color, fontImageData} from './gfx/text.js'

import {sprites} from './gfx/sprites.js'  // temp for testing drawing in index
import {unit_data} from './data/unit_data.js'
import {sounds, drawAudioFloatStream, playSound} from './sound/sounds.js'

import {Unit} from './model/unit.js'
//import {Map} from './model/map.js'
import {Game} from './model/game.js'
import {Player} from './model/player.js'

import {GfxDispatch, BORDER_OFFSET_PX, CELL_SIZE_PX, i_to_xy} from './gfx/gfx_dispatch.js'
import {GfxMap} from './gfx/gfx_map.js'
import {GfxEffects, SpriteEffect, SpriteAnimationEffect, HighlightEffect, InvertEffect} from './gfx/gfx_effects.js'

import {CanvasAnimationBase} from './gfx/animation_base.js'

import {getId, generateStringId} from './network/id.js'

import {DialogJoinOrCreate} from './ui/dialogs.js'
import {logging} from './log/logging.js'

import { UI } from './ui/ui_canvas.js'
import { UISpells } from './ui/spells.js'
import { UICharacterSelect } from './ui/character_select.js'
import { UIStats } from './ui/stats.js'


import {} from './log/console.js'
import { LoggingCanvas } from './log/logging_canvas.js'

import { NetworkManager } from './network/network.js'

import { JoinManager } from './manager/JoinManager.js'


const urlParams = new URLSearchParams(window.location.search)

export class Chaos extends CanvasAnimationBase {
    constructor() {
        super(...arguments)
        const c = this.context
        this.ui = new UI(document.getElementById('canvas_ui'))

        window.addEventListener("resize", this.setCanvasSizeForScreen)

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
    start_game(players) {
        logging.info('start_game')
        console.log(players)

        const game = new Game(players.map((player)=>new Player(
            player.from, player.name, player.unit_type, player.color,
        )))
        window.game = game  // Expose to console

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

    // Persistent Storage -----------------------------------------------------------------
    get persistentData() {return JSON.parse(window.localStorage.getItem("chaos") || "{}")}
    set persistentData(data) {window.localStorage.setItem("chaos", JSON.stringify(data))}

    setCanvasSizeForScreen = (event) => {
        const orientationVertical = this.window_aspect_ratio<=(2/3)
        const orientationHorizontal = this.window_aspect_ratio>=(8/3)
        if (orientationVertical) {
            this.canvas.classList.remove('full_height')
            this.ui.canvas.classList.remove('full_height')
            this.canvas.classList.add('full_width')
            this.ui.canvas.classList.add('full_width')
        }
        if (orientationHorizontal) {
            this.canvas.classList.remove('full_width')
            this.ui.canvas.classList.remove('full_width')
            this.canvas.classList.add('full_height')
            this.ui.canvas.classList.add('full_height')
        }
    }

}

new LoggingCanvas(document.getElementById('canvas_log'))

const chaos = new Chaos(document.getElementById('canvas_map'), 30)

logging.info(`Chaos \\033[91;103mMobile\\033[0m`)

// -----------------------------------------------------------------------------



let {action, channel, player_name} = await (new DialogJoinOrCreate()).showModalPromise()
if (action == 'create') {
    chaos.canvas.classList.add('full_screen')
    channel = channel || generateStringId()
    logging.info(`Join: ${window.location.host} ${channel}`)
}
if (action == 'join') {
    chaos.canvas.classList.remove('full_screen')
    chaos.setCanvasSizeForScreen()
    logging.info(`Connecting: ${window.location.host} ${channel}`)
}
const setupNetwork = (channel) => {
    chaos.canvas.classList.add('disconnected')
    const network = new NetworkManager(channel)
    network.socket.addEventListener("open", () => {chaos.canvas.classList.remove('disconnected')})
    network.socket.addEventListener("close", () => {chaos.canvas.classList.add('disconnected')})
    return network
}
const network = setupNetwork(channel)
const players = await (new JoinManager(chaos.canvas, chaos.ui, network, player_name)).promise
if (action == 'create') {
    chaos.start_game(players)
}
if (action == 'join') {
    logging.info(`Client waiting`)
}