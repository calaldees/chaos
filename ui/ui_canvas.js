import { Dimension } from "../core.js"
import { COLOR } from '../gfx/color.js'
import { drawBorder } from '../gfx/border.js'
import { drawFont_color, extract_ansi_colors, FONT_WIDTH, FONT_HEIGHT } from '../gfx/text.js'

class UIItem {
    constructor(action, text) {

    }
}

export class UI {
    constructor(canvas) {
        this.canvas = canvas || document.getElementById('canvas')
        this.c = this.canvas.getContext('2d')

        this.dimension = new Dimension(15, 12)
        this.map_data = new Array(this.dimension.size)
        this._items = []

        this.setColorBackground(COLOR.red)
        this.setColorBorder(COLOR.yellow)

        this.title = 'Galactium!'
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}

    setColorBackground = (color) => {
        this.backgroundColor = color
        this.c.fillStyle = color
        this.c.fillRect(0,0,this.w,this.h)
    }
    setColorBorder = (color) => {
        this.colorBorder = color
        drawBorder(this.c, color, 0, 0, this.w, this.h)
    }
    clear() {
        this._items = []
        this.setColorBackground(this.colorBackground)
        this.setColorBorder(this.colorBorder)
    }

    get title() {return this._title}
    set title(title) {
        this._title = title
        let [title_no_color, _] = extract_ansi_colors(this._title)
        const start_x_center = (Math.floor(this.dimension.width/2) - Math.floor(title_no_color.length/2)) * FONT_WIDTH
        console.log(start_x_center, this._title)
        drawFont_color(this.c, this._title, start_x_center, 8)
    }

    get items() {}
    set items(items) {

    }

    getItemAt = (i) => {return this.map_data[i]}
    highlightItemAt = (i) => {
        
    }
}
