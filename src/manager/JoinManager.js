import { UIJoin } from './ui/join.js'

export class JoinManager {
    constructor(canvas, network) {
        console.assert(canvas.constructor.name == 'NetworkManager')
        console.assert(network.constructor.name == 'NetworkManager')
        this.ui = new UIJoin(canvas)
        this.ui.players = [
            {name: 'allan', unit_type: "Wizard JULIAN", color: COLOR.red_bright},
            {name: 'dave', unit_type: "Wizard ILIAN RANE", color: COLOR.yellow},
            {name: 'scotthope', unit_type: "Wizard GREATFOGEY", color: COLOR.green_bright},
            {name: 'test1', unit_type: "Wizard GANDALF", color: COLOR.magenta_bright},
            {name: 'test2', unit_type: "Wizard DYERARTI", color: COLOR.yellow_bright},
            {name: 'test3', unit_type: "Wizard GOWIN", color: COLOR.cyan_bright},

            //{name: 'thingy', unit_type: "Wizard MERLIN", color: COLOR.white_bright},
            //{name: 'whotzit', unit_type: "Wizard ASIMONO ZARK", color: COLOR.white},
        ]
    }
    get state() {}
}