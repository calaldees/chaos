import {loadImage} from './image_decode.js'
import {shiftImage} from './color.js'
import { border_data } from '../data/sprite_data.js'

const borders = Object.fromEntries(Object.entries(border_data).map(
    ([key, image_hex_data]) => [key, loadImage(image_hex_data)]
))

function drawBorder(c, x1, y1, x2, y2, color_foreground, color_background=null) {
    function d(i,x,y) {
        if (color_background) {
            c.fillStyle = color_background
            c.fillRect(x,y,8,8)
        }
        c.drawImage(shiftImage(i, color_foreground),x,y)
    }
    d(borders.top_left, x1, y1)
    d(borders.bottom_left, x1, y2-8)
    d(borders.top_right, x2-8, y1)
    d(borders.bottom_right, x2-8, y2-8)
    for (let x=x1+8 ; x<x2-8 ; x+=8) {
        d(borders.top, x, y1)
        d(borders.bottom, x, y2-8)
    }
    for (let y=y1+8 ; y<y2-8 ; y+=8) {
        d(borders.left, x1, y)
        d(borders.right, x2-8, y)
    }
}

export {
    drawBorder,
}