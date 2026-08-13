import { enumerate } from '../core.js'
import { COLOR } from '../gfx/color.js'

import { mergeItemsAndLayout, UIInputBase } from './ui_input_base.js'

export class UIMoves {
    constructor(ui) {
        console.assert(ui.constructor.name == UIInputBase.name, 'must pass ui obj')
        this.ui = ui
        ui.setBorder(COLOR.red, undefined, 16)

        //ui.callback = (item) => {console.log('UIMoves', item)}
    }

    updateItems = (units) => {  // units:Unit[]
        this.ui.drawFont("Moves", 0,0, COLOR.yellow)
        // TODO: Look at this.players unit and stats
        //{i, key, text, color, hide_key_prefix}

        //const unit_types = units.map((unit)=>unit.unit_type)
        // unit_types will be expanded to the state of those units
        //  is a move queued? is an attack queued?
        //  These states probably need to be visualised on the map

        const START_ROW = 1
        const START_ROW_OFFSET = this.ui.dimension.width * START_ROW
        this.ui.items = [...enumerate(units)].map(
            ([row, unit]) => {
                const row_index = START_ROW_OFFSET + (row * this.ui.dimension.width)

                // Temp: Draw un-intractable stuff
                // This is contaminating item generation and drawing
                // There should probably be separate draw step
                this.ui.drawUnit(unit.unit_type, 2, row + START_ROW)
                // TODO:
                // the un-intractable/disabled text should be drawn _greyed out_ before the intractable text

                return [
                    {
                        'i': row_index,
                        'key': String.fromCharCode(row+49),  // 49='1'
                        'action': 'unit',
                        'text': '   ',  // Should cover the unit that was drawn to this space earlier
                        'hide_key_prefix': false,
                        'color': COLOR.white,
                        'unit': unit,
                    },
                    {
                        'i': row_index + 5,
                        'key': undefined,
                        'action': 'move',
                        'text': 'move',
                        'hide_key_prefix': true,
                        'color': COLOR.white,
                    },
                    {
                        'i': row_index + 10,
                        'key': undefined,
                        'text': 'action',
                        'hide_key_prefix': true,
                        'action': 'aciton',
                        'color': COLOR.white,
                    },
                    {
                        'i': row_index + 17,
                        'key': undefined,
                        'action': 'range attack',
                        'text': 'range',
                        'hide_key_prefix': true,
                        'color': COLOR.white,
                    },
                    {  // maybe spell could replace rng? do wizards ever have an ongoing range attack?
                        'i': row_index + 23,
                        'key': undefined,
                        'action': 'spell',
                        'text': 'spell',
                        'hide_key_prefix': true,
                        'color': COLOR.white,
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


