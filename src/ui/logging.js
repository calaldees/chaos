import { enumerate } from '../core.js'
import { drawFont_color, FONT_HEIGHT } from '../gfx/text.js'

export class UILogging {
    constructor(ui) {
        console.assert(ui.constructor.name == "UI", 'must pass ui obj')
        this.ui = ui
    }
    render_messages = (messages) => {
        for (let [row, message] of enumerate(messages.reverse())) {
            drawFont_color(this.ui.c, message, 0, row*FONT_HEIGHT)
        }
    }
}


