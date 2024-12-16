import { COLOR } from '../gfx/color.js'
import { drawBorder } from '../gfx/border.js'
import { drawFont_color, FONT_HEIGHT } from '../gfx/text.js'

export class UI {
    constructor(canvas) {
        this.canvas = canvas || document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.setBackgroundColor(COLOR.red)
        this.setBorderColor(COLOR.yellow)
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}

    setBackgroundColor = (color) => {
        this.context.fillStyle = color
        this.context.fillRect(0,0,this.w,this.h)
    }
    setBorderColor = (color) => {
        drawBorder(this.context, color, 0, 0, this.w, this.h)
        // drawBorder(c,COLOR.blue,0,0,this.w,this.h-16)
        // function drawBorder(c, color, x1, y1, x2, y2) {
    }
}
