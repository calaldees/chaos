import { range } from '../core.js'
import { COLOR, shiftImage } from '../gfx/color.js'

import {gfx_units} from '../gfx/units.js'
import {mergeItemsAndLayout} from './ui_canvas.js'
import { FONT_HEIGHT } from '../gfx/text.js'

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

        ui.items = [
            ...mergeItemsAndLayout([
                {action:"Wizard JULIAN", text:'  ', color: COLOR.cyan},
                {action:"Wizard GANDALF", text:'  ', color: COLOR.cyan},
                {action:"Wizard GREATFOGEY", text:'  ', color: COLOR.cyan},
                {action:"Wizard DYERARTI", text:'  ', color: COLOR.cyan},
                {action:"Wizard GOWIN", text:'  ', color: COLOR.cyan},
                {action:"Wizard MERLIN", text:'  ', color: COLOR.cyan},
                {action:"Wizard ILIAN RANE", text:'  ', color: COLOR.cyan},
                {action:"Wizard ASIMONO ZARK", text:'  ', color: COLOR.cyan},
            ], this.UI_INDEXES_CHAR_SELECT()),
            ...mergeItemsAndLayout([
                {action:"Color red_bright", text:'  ', color: COLOR.cyan},
                {action:"Color magenta_bright", text:'  ', color: COLOR.cyan},
                {action:"Color green_bright", text:'  ', color: COLOR.cyan},
                {action:"Color cyan_bright", text:'  ', color: COLOR.cyan},
                {action:"Color yellow", text:'  ', color: COLOR.cyan},
                {action:"Color yellow_bright", text:'  ', color: COLOR.cyan},
                {action:"Color white", text:'  ', color: COLOR.cyan},
                {action:"Color white_bright", text:'  ', color: COLOR.cyan},
            ], this.UI_INDEXES_COLOR())
        ]

        for (let item of ui.items.slice(0,8)) {
            this.ui.c.drawImage(
                shiftImage(...gfx_units[item.action].sprite_and_color(0)),
                ...this.ui.i_to_xy(item.i + 1)
            )
        }
        for (let item of ui.items.slice(8,16)) {
            this.ui.c.fillStyle = COLOR[item.action.replace('Color ', '')]
            this.ui.c.fillRect(...this.ui.i_to_xy(item.i + 1),FONT_HEIGHT,FONT_HEIGHT)
        }
    }

    UI_INDEXES_CHAR_SELECT(start_row=6) {
        return [...range(8)].map((r)=>{return {
            'i': (this.ui.dimension.width*start_row)+(r*3),
            'key': String.fromCharCode(r+49),
        }})
    }

    UI_INDEXES_COLOR(start_row=8) {
        return [...range(8)].map((r)=>{return {
            'i': (this.ui.dimension.width*start_row)+(r*3),
            'key': String.fromCharCode(r+65),
        }})
    }

}
