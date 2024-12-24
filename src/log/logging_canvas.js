import { logging } from './logging.js'
import { drawFont_color, FONT_HEIGHT } from '../gfx/text.js'

/*
window.addEventListener('resize', () => {
    document.getElementById("log").style = `display: ${(window.innerWidth / window.innerHeight) <= 1.5 ? "none": "block"}`;
    console.log(document.getElementById("log").style)
}, false);
*/

export class LoggingCanvas {
    constructor(canvas) {
        this.canvas = canvas || document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.pos = 0
        logging.registerHandler("log", this._log)
    }
    _log = (level, message) => {
        drawFont_color(this.context, message, 0, this.pos)
        this.pos += FONT_HEIGHT
    }
}
