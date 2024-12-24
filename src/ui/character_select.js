import { range } from '../core.js'
import { COLOR } from '../gfx/color.js'

import {mergeItemsAndLayout} from './ui_canvas.js'

export class UICharacterSelect {
    constructor(ui) {
        console.assert(ui.constructor.name == "UI", 'must pass ui obj')
        this.ui = ui
        ui.setBorder(COLOR.blue_bright, COLOR.cyan, 16)

        ui.drawFont("PLAYER 3", 0, 0, COLOR.yellow)
        ui.drawFont("Enter name (12 letters max.)", 0, 1, COLOR.magenta)
        ui.drawFont("allan", 0, 2, COLOR.cyan)
        ui.drawFont("Computer controlled?", 0, 4, COLOR.magenta)
        ui.drawFont("NO", 21, 4, COLOR.yellow)
        ui.drawFont("Which character?", 0, 5, COLOR.magenta)

        ui.drawFont("Which colour?", 0, 7, COLOR.magenta)

        ui.items = [...mergeItemsAndLayout([
            {action:'test1', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
            {action:'test2', text:'**', color: COLOR.cyan},
        ], this.UI_INDEXES_ORIGINAL_CHAR_SELECT())]
    }

    UI_INDEXES_ORIGINAL_CHAR_SELECT(start_row=6) {
        return [...range(8)].map((r)=>{return {
            'i': (this.ui.dimension.width*start_row)+(r*3),
            'key': String.fromCharCode(r+49),
        }})
    }

}
