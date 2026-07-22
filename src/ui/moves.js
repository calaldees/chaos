import { enumerate } from '../core.js'
import { COLOR } from '../gfx/color.js'

import {mergeItemsAndLayout} from './ui_canvas.js'

export class UIMoves {
    constructor(ui, player) {
        console.assert(ui.constructor.name == "UI", 'must pass ui obj')
        this.ui = ui
        this.player = player
        ui.callback = (item) => {console.log('UIMoves', item)}
        ui.drawFont("Moves", 0,0, COLOR.yellow)
        this.updateItems()
    }

    updateItems = () => {
        // TODO: Look at this.players unit and stats
        //{i, key, text, color, hide_key_prefix}

        unit_types = ["Wizard JULIAN", "King Cobra", "Bat", "Elf"]
        // unit_types will be expanded to the state of those units
        //  is a move queued? is an attack queued?
        //  These states probably need to be visualised on the map

        const START_ROW = 1
        const START_ROW_OFFSET = this.ui.dimension.width * START_ROW
        this.ui.items = [...enumerate(unit_types)].map(
            (row, unit_type) => {
                row_index = START_ROW_OFFSET + (row * this.ui.dimension.width)

                // Temp: Draw un-intractable stuff
                // This is contaminating item generation and drawing
                // There should probably be separate draw step
                this.drawUnit(unit_type, 1, row + START_ROW)
                // TODO:
                // the un-intractable/disabled text should be drawn _greyed out_ before the intractable text

                return [
                    {
                        'i': row_index,
                        'key': String.fromCharCode(row+49),  // 49='1'
                        'text': '   mov',  // the drawUnit should be where the spaces are
                        'hide_key_prefix': false,
                        // 'color':  // untaken? taken? disabled?
                    },
                    {
                        'i': row_index + 7,
                        'key': undefined,
                        'text': 'act',
                        'hide_key_prefix': true,
                    },
                    {
                        'i': row_index + 10,
                        'key': undefined,
                        'text': 'rng',
                        'hide_key_prefix': true,
                    },
                    {
                        'i': row_index + 13,
                        'key': undefined,
                        'text': 'spl',
                        'hide_key_prefix': true,
                    },
                ]
            }
        ).flat()

    }

    get UI_INDEXES_ROWS_3_ITEMS() {
        return [...range(9)]
        .map((r)=>{
            return [
            ]
        }).flat()
    }

}


