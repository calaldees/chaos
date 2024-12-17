import { Dimension } from "../core.js"
import { COLOR } from '../gfx/color.js'
import { drawBorder } from '../gfx/border.js'
import { drawFont, extract_ansi_colors, FONT_WIDTH, FONT_HEIGHT } from '../gfx/text.js'

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

        this.clear()

        this.title = 'Galactium!'

        this.canvas.addEventListener("mousedown", this.mouseDown)
        //this.canvas.addEventListener("mousemove", this.mouseDown)
        this.canvas.addEventListener("click", this.mouseClick)
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}

    mouseDown = (event) => {
        //if (event.type=='mousedown' || (event.type=='mousemove' && event.buttons)) {
        console.log('mousedown', event)
        //}
    }
    mouseClick = (event) => {
        console.log('click', event)
    }

    setBorder = (color_foreground, color_background=null) => {
        this.border = [color_foreground, color_background]
        drawBorder(this.c, 0, 0, this.w, this.h, ...this.colorBorder)
    }
    clear = (color) => {
        this.backgroundColor = color || COLOR.black
        this.c.fillStyle = this.backgroundColor
        this.c.fillRect(0,0,this.w,this.h)
        this._items = []
        this.border = null
    }

    //get title() {return this._title}
    //set title(title) {
    //    this._title = title
    //    let [title_no_color, _] = extract_ansi_colors(this._title)
    //    const start_x_center = (this.dimension.width - Math.floor(title_no_color.length/2)) * FONT_WIDTH
    //    drawFont(this.c, this._title, start_x_center, this.border?8:0)
    //}

    get items() {}
    set items(items) {
        this.items = items
        for (let [i, key, action, text] of items) {

        }
    }

    getItemAt = (i) => {return this.map_data[i]}
    highlightItemAt = (i) => {
        
    }
}
