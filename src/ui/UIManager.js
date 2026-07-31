// Keep track of Map, Menu, Effects and Cursor

import { UIMoves } from '../ui/moves.js'

export class UIManager {
    constructor(map_ui, input_ui) {
        console.assert(map_ui.constructor.name == 'MapUI')
        console.assert(input_ui.constructor.name == 'UI')
        this.map_ui = map_ui
        this.input_ui = input_ui
    }
    // new UIMoves(input_ui)
}