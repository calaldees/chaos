import {enumerate} from '../core.js'

import {cleanHexString, hexToBytes, bytesToMono8x8ImageDataChunks} from './image_decode.js'

import {sprite_data} from '../data/sprite_data.js'

export function imageDataToImageBitmap(topImageData, bottomImageData) {
    const offscreen = new OffscreenCanvas(8, 16)
    const c = offscreen.getContext("2d")
    c.putImageData(topImageData, 0, 0)
    c.putImageData(bottomImageData, 0, 8)
    return offscreen.transferToImageBitmap()
}


// https://zxnet.co.uk/spectrum/chaos/asm/D908.html
const FONT_ORDER = ` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_£abcdefghijklmnopqrstuvwxyz{|}~©`

export const fontImageData = [...bytesToMono8x8ImageDataChunks(hexToBytes(cleanHexString(sprite_data.font)))]
const fontImageBitMaps = {}
for (let [i,char] of enumerate(FONT_ORDER)) {
    fontImageBitMaps[char] = imageDataToImageBitmap(fontImageData[i], fontImageData[i+FONT_ORDER.length])
}

export function drawFont(c, string, x, y) {
    for (let [i, char] of enumerate(string)) {
        c.drawImage(fontImageBitMaps[char], x+(i*8), y)
    }
}

export function drawFont_color(c, string, x, y) {
    // strip out color code and create color map to be inline with 'i'
    for (let [i, char] of enumerate(string)) {
        c.drawImage(fontImageBitMaps[char], x+(i*8), y)
    }
}
export function word_wrap() {
    //word wrap?
}
export function render_text() {
    
}


// TODO: Color? - use Linux codes?
// https://www.codeproject.com/Articles/5329247/How-to-change-text-color-in-a-Linux-terminal
// https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
// https://ss64.com/nt/syntax-ansi.html

// "\033[31;1;4m"

const REGEX_ansi_color = /\\033\[([0-9;]+)m/d
function extract_ansi_colors(text) {
    const pos_ansi = []
    let match
    while ((match = REGEX_ansi_color.exec(text))) {
        const pos = match.indices[0][0]
        const ansi_codes = match[1].split(";")
        pos_ansi.push([pos, ansi_codes])
        text = text.replace(match[0],"")
    }
    return [text, pos_ansi]
}
extract_ansi_colors("Bob is cool \\033[0;41;2mHello World\\033[0m")
// TODO: unit test this shiz
