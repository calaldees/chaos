import {Game} from './model/game.js'
import {Player} from './model/player.js'

import {getId, generateStringId} from './network/id.js'

import {logging} from './log/logging.js'
import {} from './log/console.js'
import { LoggingCanvas } from './log/logging_canvas.js'

import { UIMap } from './ui/map.js'
import { UIInputBase } from './ui/ui_input_base.js'

import { NetworkManager } from './network/network.js'
import { DialogJoinOrCreate } from './ui/dialogs.js'
import { JoinManager } from './manager/JoinManager.js'

import { COLOR } from './gfx/color.js'
import { UIManager } from './ui/UIManager.js'

const urlParams = new URLSearchParams(window.location.search)
const this_id = getId()

const ui_map = new UIMap(document.getElementById('canvas_map'), 30)
const ui_input_base = new UIInputBase(document.getElementById('canvas_ui'))

const setCanvasSizeForScreen = (event) => {
    const orientationVertical = ui_map.window_aspect_ratio<=(2/3)
    const orientationHorizontal = ui_map.window_aspect_ratio>=(8/3)
    if (orientationVertical) {
        ui_map.canvas.classList.remove('full_height')
        ui_input_base.canvas.classList.remove('full_height')
        ui_map.canvas.classList.add('full_width')
        ui_input_base.canvas.classList.add('full_width')
    }
    if (orientationHorizontal) {
        ui_map.canvas.classList.remove('full_width')
        ui_input_base.canvas.classList.remove('full_width')
        ui_map.canvas.classList.add('full_height')
        ui_input_base.canvas.classList.add('full_height')
    }
}
window.addEventListener("resize", setCanvasSizeForScreen)


logging.info(`Chaos \\033[91;103mMobile\\033[0m`)

// -----------------------------------------------------------------------------

async function local_test() {

    const game = new Game([
        new Player(this_id, 'Test1', "Wizard JULIAN" , COLOR.white),
        new Player('aaaaa', 'Test2', "Wizard GANDALF", COLOR.red  ),
    ])
    ui_map.game = game
    game.newUnit("King Cobra", this_id, game.map.dimension.position_to_index(4,3))
    game.newUnit("Horse", this_id, game.map.dimension.position_to_index(3,3))
    game.newUnit("Eagle", 'aaaaa', game.map.dimension.position_to_index(12,4))
    game.newUnit("Vampire", 'aaaaa', game.map.dimension.position_to_index(4,2))

    new UIManager(ui_map, ui_input_base, game.registry.players.get(this_id))

}
await local_test()

// Main ------------------------------------------------------------------------
// DISABLED
async function main() {

let {action, channel, player_name} = await (new DialogJoinOrCreate()).showModalPromise()
if (action == 'create') {
    ui_map.canvas.classList.add('full_screen')
    channel = channel || generateStringId()
    logging.info(`Join: ${window.location.host} ${channel}`)
}
if (action == 'join') {
    ui_map.canvas.classList.remove('full_screen')
    setCanvasSizeForScreen()
    logging.info(`Connecting: ${window.location.host} ${channel}`)
}

const connectNetwork = (channel) => {
    ui_map.canvas.classList.add('disconnected')
    const network = new NetworkManager(channel)
    network.socket.addEventListener("open", () => {ui_map.canvas.classList.remove('disconnected')})
    network.socket.addEventListener("close", () => {ui_map.canvas.classList.add('disconnected')})
    return network
}
const network = connectNetwork(channel)

const players = await (new JoinManager(ui_map.canvas, ui_input_base, network, player_name)).promise
// players[] of {name:str, unit_type:str, color: COLOR.white}  // god I want types
if (action == 'create') {
    const game = new Game(players.map((player)=>new Player(
        player.from, player.name, player.unit_type, player.color,
    )))
    ui_map.game = game
    network.addOnMessageListener((data)=>{
        console.log('host got network data??')
    })
    network.send(game.state)
}
if (action == 'join') {
    logging.info(`Client waiting`)
    const game = new Game()
    ui_map.game = game
    network.addOnMessageListener((data)=>{
        game.state = data
    })
}

// Expose for use in console for debugging
//window.game = game
//window.network = network

}


/*
    // Persistent Storage -----------------------------------------------------------------
    get persistentData() {return JSON.parse(window.localStorage.getItem("chaos") || "{}")}
    set persistentData(data) {window.localStorage.setItem("chaos", JSON.stringify(data))}
*/