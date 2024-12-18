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

        this.dimension = new Dimension(this.w/FONT_WIDTH, this.h/FONT_HEIGHT)  // 32, 12 (without border)
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

    xyFromMouseEvent(event) {
        // x and y in the mouse event don't relate to the parent element. Thanks javascript.
        const rect = event.target.getBoundingClientRect()
        return [event.clientX - rect.left, event.clientY - rect.top]
    }
    mouseDown = (event) => {
        //if (event.type=='mousedown' || (event.type=='mousemove' && event.buttons)) {
        console.log('mousedown', event)
        //}
    }
    mouseClick = (event) => {
        const item = getItemAt(this.xy_to_i(...this.xyFromMouseEvent(event)))
        //console.log('click', event)
    }

    setBorder = (color_foreground, color_background=null) => {
        this.border = [color_foreground, color_background]
        drawBorder(this.c, 0, 0, this.w, this.h, ...this.colorBorder)
    }
    get border_offset_px() {this.border?8:0}

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
    //    const start_x_center = (Math.floor(this.dimension.width/2) - Math.floor(title_no_color.length/2)) * FONT_WIDTH
    //    drawFont(this.c, this._title, start_x_center, this.border_offset_px)
    //}

    i_to_xy = (i) => {
        const [x,y,z] = this.dimension.index_to_position(i)
        return [x*FONT_WIDTH+this.border_offset_px, y*FONT_HEIGHT+this.border_offset_px]
    }
    xy_to_i(x,y) {
        return this.dimension.position_to_index(
            Math.floor((x-this.border_offset_px)/FONT_WIDTH),
            Math.floor((y-this.border_offset_px)/FONT_HEIGHT),
        )
    }

    get items() {}
    set items(items) {
        this.items = items
        for (let [i, key, action, text] of items) {
            const [x, y] = this.i_to_xy(i)
            drawFont(this.c, text, x, y)
        }
    }

    getItemAt = (i) => {return this.map_data[i]}
    highlightItem = (item) => {
        c.save()
        c.globalCompositeOperation='difference'
        c.fillStyle='white'
        c.fillRect(0, 0, CELL_SIZE_PX, CELL_SIZE_PX)
        c.restore()
    }
}
