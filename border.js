import {loadImage} from './image_decode.js'
import {shiftImage} from './image_draw.js'

// Border data from https://zxnet.co.uk/spectrum/chaos/asm/BB15.html
const borders = Object.fromEntries(Object.entries({
    "left": "$D0,$E4,$D0,$EA,$D0,$E4,$D0,$EA",
    "right": "$57,$0B,$27,$0B,$57,$0B,$27,$0B",
    "top": "$FF,$FF,$AA,$55,$88,$22,$88,$00",
    "bottom": "$00,$11,$44,$11,$AA,$55,$FF,$FF",
    "top_left": "$FF,$FF,$EA,$F5,$D0,$E4,$D0,$EA",
    "top_right": "$FF,$FF,$AF,$5B,$87,$2B,$87,$0B",
    "bottom_left": "$D0,$E1,$D4,$E1,$DA,$F5,$FF,$FF",
    "bottom_right": "$57,$0B,$27,$0B,$AF,$57,$FF,$FF",
}).map(
    ([key, image_hex_data]) => [key, loadImage(image_hex_data)]
))

function drawBorder(c, color, x1, y1, x2, y2) {
    function d(i,x,y) {c.drawImage(shiftImage(i, color),x,y)}
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