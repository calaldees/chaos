import { enumerate } from '../core.js'
import { COLOR } from '../gfx/color.js'
import { ActionType } from '../model/actions.js'

import { mergeItemsAndLayout, UIInputBase } from './ui_input_base.js'
import { QueuedActionManager, ActionState } from './actions.js'

export class UIUnitActions {
    constructor(ui, actions) {
        console.assert(ui.constructor.name == UIInputBase.name, 'must pass ui obj')
        console.assert(actions.constructor.name == QueuedActionManager.name, 'must pass ui obj')
        this.ui = ui
        this.actions = actions

        this.ui.setBorder(COLOR.red, undefined, 16)
        this.ui.drawFont("Actions", 0,0, COLOR.yellow)
    }

    updateItems() {
        // TODO: Look at this.players unit and stats
        //{i, key, text, color, hide_key_prefix}

        const units = this.actions.units

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
                //this.ui.drawUnit(unit.unit_type, 2, row + START_ROW)

                const unit_action_state = this.actions.actionUnitState(unit)
                function actionToColor(action_type) {  // color
                    const state = unit_action_state.get(action_type)
                    if (state == ActionState.QUEUED) {return COLOR.cyan_bright}
                    if (state == ActionState.AVAILABLE) {return COLOR.white}
                    if (state == ActionState.UNAVAILABLE) {return COLOR.grey}
                }
                function actionString(action_type) {
                    const state = unit_action_state.get(action_type)
                    return state == ActionState.AVAILABLE ? action_type : undefined
                }
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
                        'action': ActionType.MOVE,
                        'text': 'move',
                        'hide_key_prefix': true,
                        'color': actionToColor(ActionType.MOVE),
                        'action_state': unit_action_state.get(ActionType.MOVE)
                    },
                    {
                        'i': row_index + 10,
                        'key': undefined,
                        'action': ActionType.ATTACK,
                        'text': 'attack',
                        'hide_key_prefix': true,
                        'color': actionToColor(ActionType.ATTACK),
                        'action_state': unit_action_state.get(ActionType.ATTACK)
                    },
                    {
                        'i': row_index + 17,
                        'key': undefined,
                        'action': ActionType.RANGEATTACK,
                        'text': 'range',
                        'hide_key_prefix': true,
                        'color': actionToColor(ActionType.RANGEATTACK),
                        'action_state': unit_action_state.get(ActionType.RANGEATTACK)
                    },
                    {
                        'i': row_index + 23,
                        'key': undefined,
                        'action': ActionType.SPELL,
                        'text': 'spell',
                        'hide_key_prefix': true,
                        'color': actionToColor(ActionType.SPELL),
                        'action_state': unit_action_state.get(ActionType.SPELL)
                    },
                ]
            }
        ).flat()
        .map((ui_item)=>{
            if (ui_item?.unit) {
                this.ui.drawUnit(ui_item.unit.unit_type, ui_item.i+2)
            }
            return ui_item
        })
        .map((ui_item)=>{
            if (ui_item?.action_state == ActionState.UNAVAILABLE) {
                // If UNAVAILABlE, we should not store/activate an intractable ui_item
                // Draw the text in place now, but return no ui_item to register mouse clicks
                this.ui.drawFont_i(ui_item.text, ui_item.i, ui_item.color)
                return null
            }
            return ui_item
        })

    }
}


