import {Game} from './model/game.js'
import {Player} from './model/player.js'

import {getId, generateStringId} from './network/id.js'

import {logging} from './log/logging.js'
import {} from './log/console.js'
import { LoggingCanvas } from './log/logging_canvas.js'

import { MapUI } from './ui/map.js'
import { UI } from './ui/ui_canvas.js'

import { NetworkManager } from './network/network.js'
import { DialogJoinOrCreate } from './ui/dialogs.js'
import { JoinManager } from './manager/JoinManager.js'


const urlParams = new URLSearchParams(window.location.search)

const log_ui = new LoggingCanvas(document.getElementById('canvas_log'))
const map_ui = new MapUI(document.getElementById('canvas_map'), 30)
const input_ui = new UI(document.getElementById('canvas_ui'))

const setCanvasSizeForScreen = (event) => {
    const orientationVertical = map_ui.window_aspect_ratio<=(2/3)
    const orientationHorizontal = map_ui.window_aspect_ratio>=(8/3)
    if (orientationVertical) {
        map_ui.canvas.classList.remove('full_height')
        input_ui.canvas.classList.remove('full_height')
        map_ui.canvas.classList.add('full_width')
        input_ui.canvas.classList.add('full_width')
    }
    if (orientationHorizontal) {
        map_ui.canvas.classList.remove('full_width')
        input_ui.canvas.classList.remove('full_width')
        map_ui.canvas.classList.add('full_height')
        input_ui.canvas.classList.add('full_height')
    }
}
window.addEventListener("resize", setCanvasSizeForScreen)


logging.info(`Chaos \\033[91;103mMobile\\033[0m`)

let {action, channel, player_name} = await (new DialogJoinOrCreate()).showModalPromise()
if (action == 'create') {
    map_ui.canvas.classList.add('full_screen')
    channel = channel || generateStringId()
    logging.info(`Join: ${window.location.host} ${channel}`)
}
if (action == 'join') {
    map_ui.canvas.classList.remove('full_screen')
    setCanvasSizeForScreen()
    logging.info(`Connecting: ${window.location.host} ${channel}`)
}

const connectNetwork = (channel) => {
    map_ui.canvas.classList.add('disconnected')
    const network = new NetworkManager(channel)
    network.socket.addEventListener("open", () => {map_ui.canvas.classList.remove('disconnected')})
    network.socket.addEventListener("close", () => {map_ui.canvas.classList.add('disconnected')})
    return network
}
const network = connectNetwork(channel)

const players = await (new JoinManager(map_ui.canvas, input_ui, network, player_name)).promise
if (action == 'create') {
    const game = new Game(players.map((player)=>new Player(
        player.from, player.name, player.unit_type, player.color,
    )))
    map_ui.game = game
    network.addOnMessageListener((data)=>{
        console.log('host got network data??')
    })
    network.send(game.state)
}
if (action == 'join') {
    logging.info(`Client waiting`)
    const game = new Game()
    map_ui.game = game
    network.addOnMessageListener((data)=>{
        game.state = data
    })
}

// Expose for use in console for debugging
//window.game = game
//window.network = network

/*
    // Persistent Storage -----------------------------------------------------------------
    get persistentData() {return JSON.parse(window.localStorage.getItem("chaos") || "{}")}
    set persistentData(data) {window.localStorage.setItem("chaos", JSON.stringify(data))}
*/