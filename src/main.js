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


const urlParams = new URLSearchParams(window.location.search);

export class ChaosTest extends CanvasAnimationBase {
constructor() {
    super(...arguments)
    const c = this.context
    this.ui = new UI(document.getElementById('canvas_ui'))

    const setCanvasSizeForScreen = (event) => {
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
    window.addEventListener("resize", setCanvasSizeForScreen)

    // Logging
    new LoggingCanvas(document.getElementById('canvas_log'))
    logging.registerHandler("map", (level, message)=>{
        const message_xy = [0, 176]
        this.context.clearRect(...message_xy, this.w, this.h)
        drawFont_color(this.context, message, ...message_xy)
    })
    logging.info(`Chaos \\033[91;103mMobile\\033[0m Test`)

    let network
    const setupNetwork = (channel) => {
        this.canvas.classList.add('disconnected')
        network = new NetworkManager(channel)
        network.socket.addEventListener("open", () => {this.canvas.classList.remove('disconnected')})
        network.socket.addEventListener("close", () => {this.canvas.classList.add('disconnected')})
        window.network = network  // for debugging
        //network.addOnMessageListener((data)=>console.log("socket recv", data))
    }

    // DialogJoin
    const dialogActions = {
        create: (channel)=>{
            channel = channel || generateStringId()
            logging.info(`Join: ${window.location.host} ${channel}`)
            this.canvas.classList.add('full_screen')
            setupNetwork(channel)
            new JoinManager(this.canvas, this.ui, network)
        },
        join: (channel, player_name)=>{
            logging.info(`Connecting: ${window.location.host} ${channel}`)
            this.canvas.classList.remove('full_screen')
            setupNetwork(channel)
            setCanvasSizeForScreen()
            new JoinManager(this.canvas, this.ui, network, player_name)
        },
    }
    const dialogAction = urlParams.get('dialogAction')
    if (dialogAction == 'create') {dialogActions.create(urlParams.get('channel'))}
    if (dialogAction == 'join'  ) {dialogActions.join(urlParams.get('channel'), urlParams.get('player_name'))}
    if (!dialogAction) {new DialogJoinOrCreate(dialogActions)}

    // Mouse
    this.mouse_index = undefined
    this.mouse_effect = {}
    this.cursor = sprites.cursor[0]

    // UI Test
    //new UISpells(ui)
    //new UICharacterSelect(ui)
    //const uis = new UIStats(ui)
    //uis.drawStats("King Cobra")

    // Sprite tests
    drawBorder(c,0,0,this.w,this.h-16,COLOR.blue)
    //drawFont_color(c, `Chaos \\033[91;103mMobile\\033[0m Test`, 0, 176)

    //c.drawImage(sprites.animation.twirl[8], 10*16,7*16)

    // Early draw tests without model or animation
    //for (let i=0 ; i<sprites.wizard.length ; i++) {
    //    c.drawImage(shiftImage(sprites.wizard[i], Object.values(COLOR)[i%7+1]) , (i+1)*16, 16)
    //}
    //for (let i=0 ; i<monster_sprites.length ; i++) {
    //    c.drawImage(shiftImage(monster_sprites[i], COLOR.white) , (i%16)*16, 32+(Math.floor(i/16)*16))
    //}

    const game = new Game([
        //new Player("Player1", "Wizard JULIAN", COLOR.yellow),
        //new Player("Player2", "Wizard GANDALF", COLOR.red),
    ])
    // Expose to console
    window.game = game

    // Model
    //for (let [i, unit_name] of enumerate(Object.keys(unit_data))) {
    //    game.map.setUnit(new Unit(unit_data[unit_name]), i)
    //}
    //game.map.getUnit(0).status.add("corpse")
    //game.map.getUnit(3).setPos(5) // HACK - test sprite flipping

    // Gfx Map
    this.gfx_map = new GfxMap(game.map)
    this.gfx_effects = new GfxEffects(game.map.dimension.size)
    this.gfx_dispatch = new GfxDispatch([this.gfx_map, this.gfx_effects])

    // Gfx Effects
    /*
    this.gfx_effects.addEffect(15*5+10, new SpriteAnimationEffect(sprites.animation.twirl))
    this.gfx_effects.addEffect(15*5+11, new SpriteAnimationEffect(sprites.animation.dragon_breath))
    this.gfx_effects.addEffect(15*5+12, new SpriteAnimationEffect(sprites.animation.attack_effect))
    this.gfx_effects.addEffect(15*5+13, new SpriteAnimationEffect(sprites.animation.explosion))
    this.gfx_effects.addEffect(15*5+14, new SpriteAnimationEffect(sprites.animation.woop))
    for (let i of [70,71,72,(71-15),(71+15)]) {
        this.gfx_effects.addEffect(i, new HighlightEffect())
    }
    this.gfx_effects.addEffect(48, new InvertEffect())
    */

    // Draw whole screen on first start
    //this.gfx_dispatch.draw(c, 0)
    //drawFont_color(c, `This is a test of word wrap, I hope it works, I sure do!`, 16, 78, 128)

    // sound temp visualization
    //c.save()
    //c.translate(0,100)
    //drawAudioFloatStream(c, sounds['engaged_sound_effect'])
    //c.restore()

    // TODO:
    //.setRunning(true)
}
loop(context, frame) {
    this.handle_mouse()
    this.gfx_dispatch.markDirty(
        ...this.gfx_map.dirtyIndexes(frame),
        ...this.gfx_effects.dirtyIndexes(frame),
    )
    this.gfx_effects.expireInactive()
    this.gfx_dispatch.drawDirty(context, frame)
    this.gfx_dispatch.resetDirtyIndexes()

    if (frame % 100 == 0) {
        //playSound(this.audioContext, 'engaged_sound_effect')
        const name = 'engaged_sound_effect'
        //this.play_audio(`sound/${name}.mp3`)
    }
}
handle_mouse() {
    const i = this.gfx_map.map_model.dimension.position_to_index(...[this.mouse_x,this.mouse_y].map((i)=>Math.floor((i-BORDER_OFFSET_PX)/CELL_SIZE_PX)))
    if (this.mouse_index == i) {return}
    console.log(i)
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


}
