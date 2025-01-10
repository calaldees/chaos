import { pick } from '../core.js'
import { COLOR } from '../gfx/color.js'
import { logging } from '../log/logging.js'
import { UIPlayers } from '../ui/players.js'
import { UICharacterSelect } from '../ui/character_select.js'


export class JoinManager {
    constructor(canvas_map, ui, network, player_name='') {
        console.assert(canvas_map.constructor.name == 'HTMLCanvasElement')
        console.assert(ui.constructor.name == 'UI')
        console.assert(network.constructor.name == 'NetworkManager')

        this.network = network

        this._player = {
            name: player_name,
            unit_type: "Wizard JULIAN",  // TODO: random select from wizards
            color: COLOR.white,          // TODO: random select from colors
        }

        this.ui_players = new UIPlayers(canvas_map)
        this.ui_players.players = [
            //{name: 'allan', unit_type: "Wizard JULIAN", color: COLOR.red_bright},
            //{name: 'dave', unit_type: "Wizard ILIAN RANE", color: COLOR.yellow},
            //{name: 'scotthope', unit_type: "Wizard GREATFOGEY", color: COLOR.green_bright},
            //{name: 'test1', unit_type: "Wizard GANDALF", color: COLOR.magenta_bright},
            //{name: 'test2', unit_type: "Wizard DYERARTI", color: COLOR.yellow_bright},
            //{name: 'test3', unit_type: "Wizard GOWIN", color: COLOR.cyan_bright},
            //{name: 'thingy', unit_type: "Wizard MERLIN", color: COLOR.white_bright},
            //{name: 'whotzit', unit_type: "Wizard ASIMONO ZARK", color: COLOR.white},
        ]

        this.ui_character_select = new UICharacterSelect(ui)
        this.ui_character_select.player_name = player_name
        this.ui_character_select.ui.callback = (item) => {
            if (item.action.indexOf('Color') == 0) {this.player = {color: COLOR[item.action.split(' ')[1]]}}
            if (item.action.indexOf('Wizard') == 0) {this.player = {unit_type: item.action}}
        }

        const isPlayer = Boolean(player_name)
        const isHost   = Boolean(!player_name)

        if (isPlayer) {
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
                if (data.action != 'players') {return this.close()}
                this.ui_players.players = data.players  // update ui
            }
        }
        if (isHost) {
            this.messageListener = (data) => {
                if (data.action != 'join') {return this.close()}
                const players = this.ui_players.players
                let player
                for (player of this.ui_players.players) {if (player.name == data.name) {break}; player = undefined}
                if (player) {
                    player.color = data.color
                    player.unit_type = data.unit_type
                } else {
                    players.push(data)
                }
                this.ui_players.players = players  // update ui
                network.send({action: 'players', players: players})
            }
        }
        network.addOnMessageListener(this.messageListener)
    }

    close() {
        this.network.removeOnMessageListener(this.messageListener)
        this.messageListener = null
        this.network = null
        // TODO: clear uis?
        this.ui_players = null
        this.ui_character_select = null
    }

    get state() {}

    get player() {return this._player}
    set player(player) {
        this._player = {...this._player, ...pick(player, 'name', 'unit_type', 'color')}
        this.network.send({action: "join", ...this.player})
    }
}