import { all, pick } from '../core.js'
import { COLOR } from '../gfx/color.js'
import { logging } from '../log/logging.js'
import { UIPlayers } from '../ui/join_players.js'
import { UICharacterSelect } from '../ui/character_select.js'


export class JoinManager {
    constructor(canvas_map, ui, network, player_name) {
        console.assert(canvas_map.constructor.name == 'HTMLCanvasElement')
        console.assert(ui.constructor.name == 'UI')
        console.assert(network.constructor.name == 'NetworkManager')
        player_name = player_name || ''
        this.network = network
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })

        this.ui_players = new UIPlayers(canvas_map)
        this.ui_players.players = []

        const isPlayer = Boolean(player_name)
        const isHost   = Boolean(!player_name)

        if (isPlayer) {
            this._player = {
                name: player_name,
                unit_type: "Wizard JULIAN",
                color: COLOR.white,
                ready: 'no',
            }

            this.ui_character_select = new UICharacterSelect(ui)
            this.ui_character_select.player_name = player_name
            this.ui_character_select.ui.callback = (item) => {
                if (item.action.indexOf('Color')  == 0) {this.player = {color: COLOR[item.action.split(' ')[1]]}}
                if (item.action.indexOf('Wizard') == 0) {this.player = {unit_type: item.action}}
                if (item.action.indexOf('Ready')  == 0) {this.player = {ready: item.action.split(' ')[1]}}
            }

            network.socket.addEventListener("open", () => {
                logging.info(`Joined: ${network.channel} as ${this.player.name}`)
                this.player = this.player  // sends the player state over network
                const HOST_RESPONSE_TIMEOUT_MILLISECONDS = 3000
                // todo: consider `await timeout(3000)`
                setTimeout(()=>{
                    if (this.ui_players.players.length==0) {
                        logging.error(`No game in channel ${this.network.channel}. Host did not respond.`)
                        this.network.close()
                    }
                }, HOST_RESPONSE_TIMEOUT_MILLISECONDS)
            })

            this.messageListener = (data) => {
                if (data.action != 'players') {
                    logging.error('Invalid message type received - out of sync')
                    return this.close()
                }
                this.ui_players.players = data.players  // update ui
                if (data.isReady) {
                    this.resolve(this.ui_players.players)
                    this.close()
                }
            }
        }
        if (isHost) {
            this.messageListener = (data) => {
                if (data.action != 'join') {
                    logging.error('Invalid message type received - out of sync')
                    return this.close()
                }
                const players = this.ui_players.players
                let player
                for (player of this.ui_players.players) {if (player.name == data.name) {break}; player = undefined}
                if (player) {
                    player.color = data.color
                    player.unit_type = data.unit_type
                    player.ready = data.ready
                } else {
                    players.push(data)
                }
                this.ui_players.players = players  // update ui

                const isReady = all(players.map(player=> player.ready == 'yes'))
                network.send({action: 'players', players: players, isReady})

                if (isReady) {
                    this.resolve(this.ui_players.players)
                    this.close()
                }
            }
        }
        network.addOnMessageListener(this.messageListener)
    }

    close() {
        this.network.removeOnMessageListener(this.messageListener)
        this.messageListener = null
        this.network = null
        // TODO: clear uis?
        this.ui_players.clear()
        this.ui_players = null
        if (this.ui_character_select) {
            this.ui_character_select.clear()
            this.ui_character_select = null
        }
        this.reject()
    }

    get state() {}

    get player() {return this._player}
    set player(player) {
        this._player = {...this._player, ...pick(player, 'name', 'unit_type', 'color', 'ready')}
        this.network.send({action: "join", ...this.player})
    }
}