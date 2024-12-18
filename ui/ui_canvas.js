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

        //this.title = 'Galactium!'

        this.canvas.addEventListener("mousedown", this.mouseDown)
        this.canvas.addEventListener("mousemove", this.mouseDown)
        this.canvas.addEventListener("click", this.mouseClick)
        this.canvas.addEventListener("keydown", this.keyDown)

        this.clear(COLOR.red)

        this.items = [
            {i:0, key:'a', action:'test1', text:'*test-item'},
            {i:32, key:'b', action:'test2', text:'^test-item2'},
        ]
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}

    xyFromMouseEvent(event) {
        // x and y in the mouse event don't relate to the parent element. Thanks javascript.
        const r = event.target.getBoundingClientRect()
        return [event.clientX - r.left, event.clientY - r.top]
    }
    mouseDown = (event) => {
        if (event.type=='mousedown' || (event.type=='mousemove' && event.buttons)) {
            this.highlightItem(this.getItemAt(this.xy_to_i(...this.xyFromMouseEvent(event))))
        }
    }
    mouseClick = (event) => {
        const item = this.getItemAt(this.xy_to_i(...this.xyFromMouseEvent(event)))
        console.log(item)
    }
    keyDown = (event) => {
        console.log(event)
    }

    setBorder = (color_foreground, color_background=null) => {
        this.border = [color_foreground, color_background]
        drawBorder(this.c, 0, 0, this.w, this.h, ...this.colorBorder)
    }
    get border_offset_px() {return this.border?8:0}

    clear = (color) => {
        this.backgroundColor = color || COLOR.black
        this.c.fillStyle = this.backgroundColor
        this.c.fillRect(0,0,this.w,this.h)
        this.border = null
        this._items = []
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

    get items() {return this._items}
    set items(items) {
        this._items = items
        this._items.forEach(this._drawItem)
    }

    //{i, key, action, text}
    _drawItem = (item) => {
        console.log(item)
        const {i, key, text} = item
        const [x, y] = this.i_to_xy(i)
        drawFont(this.c, key+text, x, y)
    }

    getItemAt = (i) => {
        const wrap = this.dimension.width
        for (let item of this._items) {
            const {i:j, text} = item
            if ((i>=j && i<=j+text.length) || (i>=j+wrap && i<=j+wrap+text.length)) {return item}
        }
    }
    highlightItem = (item) => {
        if (!item || item.highlighted) {return}
        this._items.forEach((item)=>{
            if (item.highlighted) {
                item.highlighted = false
                this._drawItem(item)
            }
        })
        item.highlighted = true
        const [x,y] = this.i_to_xy(item.i)
        this.c.save()
        this.c.globalCompositeOperation='difference'
        this.c.fillStyle='white'
        this.c.fillRect(x, y, item.text.length*FONT_WIDTH, FONT_HEIGHT)
        this.c.restore()
    }
}
