import { range } from '../core.js'
import { COLOR } from '../gfx/color.js'

import {mergeItemsAndLayout} from './ui_canvas.js'

export class UISpells {
    constructor(ui) {
        console.assert(ui.constructor.name == "UI", 'must pass ui obj')
        this.ui = ui
        ui.items = [...mergeItemsAndLayout([
            {action:'test1', text:'*test-item', color: COLOR.white},
            {action:'test2', text:'^test-item2', color: COLOR.cyan},
            {action:'test3', text:'-test-item2', color: COLOR.yellow},
        ], this.UI_INDEXES_2COLS), {i:352, key: '0', action:'cancel', text: "Press '0' to return to main menu".toUpperCase(), color: COLOR.yellow, hide_key_prefix: true}]
        ui.callback = (item) => {console.log('UISelected', item)}

        ui.drawFont("allan'S SPELLS", 0,0, COLOR.yellow)
    }

    get UI_INDEXES_2COLS() {
        const START_ROW = 1
        const START_ROW_OFFSET = this.ui.dimension.width * START_ROW
        return [...range(20)].map((r)=>{return {
            'i': START_ROW_OFFSET + (r * (this.ui.dimension.width/2)),
            'key': String.fromCharCode(r+65),  // 65='A'
        }})
    }

}


