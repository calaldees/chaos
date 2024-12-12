import {enumerate, assertEqualsObject, zip} from '../core.js'

import {cleanHexString, hexToBytes, bytesToMono8x8ImageDataChunks} from './image_decode.js'
import {COLOR, shiftImage} from './color.js'
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



// Color - with ansi terminal color codes
// https://www.codeproject.com/Articles/5329247/How-to-change-text-color-in-a-Linux-terminal
// https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
// https://ss64.com/nt/syntax-ansi.html

const REGEX_ansi_color = /\\033\[([0-9;]+)m/d
export function extract_ansi_colors(text) {
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
assertEqualsObject([
    [ extract_ansi_colors("Hello\\033[0;41;2mWorld\\033[0m!"), ["HelloWorld!", [[5,["0","41","2"]],[10,["0"]]]] ],
])

const MAP_ansi_color_to_canvas_color = {
    "0": COLOR.black,
    "30": COLOR.black,           "40": COLOR.black,
    "31": COLOR.red,             "41": COLOR.red,
    "32": COLOR.green,           "42": COLOR.green,
    "33": COLOR.yellow,          "43": COLOR.yellow,
    "34": COLOR.blue,            "44": COLOR.blue,
    "35": COLOR.magenta,         "45": COLOR.magenta,
    "36": COLOR.cyan,            "46": COLOR.cyan,
    "37": COLOR.white,           "47": COLOR.white,
    "90": COLOR.black_bright,   "100": COLOR.black_bright,
    "91": COLOR.red_bright,     "101": COLOR.red_bright,
    "92": COLOR.green_bright,   "102": COLOR.green_bright,
    "93": COLOR.yellow_bright,  "103": COLOR.yellow_bright,
    "94": COLOR.blue_bright,    "104": COLOR.blue_bright,
    "95": COLOR.magenta_bright, "105": COLOR.magenta_bright,
    "96": COLOR.cyan_bright,    "106": COLOR.cyan_bright,
    "97": COLOR.white_bright,   "107": COLOR.white_bright,
}
const DEFAULT_ANSI_COLORS = [COLOR.white_bright, COLOR.black]
function* pos_ansi_to_color_lookup(text_length, pos_ansi) {
    let [color_foreground, color_background] = DEFAULT_ANSI_COLORS
    let pos, ansi_codes
    function _next_pos_ansi() {[pos, ansi_codes] = pos_ansi?.length ? pos_ansi.shift() : [undefined, undefined]}
    _next_pos_ansi()
    for (let i=0 ; i<text_length ; i++) {
        if (i == pos) {
            for (let ansi_code of ansi_codes) {
                const color = MAP_ansi_color_to_canvas_color[ansi_code]
                // tidy this? - I feel this should be a function lookup rather than `if`
                if (ansi_code==0) {[color_foreground, color_background]=DEFAULT_ANSI_COLORS}
                if (ansi_code>=30 && ansi_code<=37 || ansi_code>=90 && ansi_code<=97) {color_foreground = color}
                if (ansi_code>=40 && ansi_code<=47 || ansi_code>=100 && ansi_code<=107) {color_background = color}
            }
            _next_pos_ansi()
        }
        yield [color_foreground, color_background]
    }
}
assertEqualsObject([
    [ [...pos_ansi_to_color_lookup(1, [])], [["#FFF","#000"]]],
    [ [...pos_ansi_to_color_lookup(3, [[1,[91,41]]])], [["#FFF","#000"],["#F00","#D00"],["#F00","#D00"]]],
    [ [...pos_ansi_to_color_lookup(3, [[1,[91,41]],[2,[102]]])], [["#FFF","#000"],["#F00","#D00"],["#F00","#0F0"]]],
])

const [FONT_WIDTH, FONT_HEIGHT] = [8, 16]
export function drawFont_color(c, string, x, y, x_width=Infinity) {
    let [text, pos_ansi] = extract_ansi_colors(string)
    let color_lookup = [...pos_ansi_to_color_lookup(text.length, pos_ansi)]
    console.assert(color_lookup.length == text.length, "drawFont text and color length should match")
    for (let [i, [char, [color_foreground, color_background]]] of enumerate(zip(text, color_lookup))) {
        const _x_progress = (i * FONT_WIDTH)
        const _x = x + (_x_progress % x_width)
        const _y = y + Math.floor(_x_progress / x_width) * FONT_HEIGHT
        c.fillStyle = color_background
        c.fillRect(_x, _y, FONT_WIDTH, FONT_HEIGHT)
        c.drawImage(shiftImage(fontImageBitMaps[char], color_foreground), _x, _y)
    }
}

// forget about word wrapping for now ..
function* _word_wrap_generator(text, x_chars, indentation) {
    let x_char = 0
    for (let word of text.split(" ")) {
        if ((x_char + word.length) > x_chars) {
            yield " ".repeat(x_chars - x_char + indentation)
            x_char = indentation
        }
        yield word + " "
        x_char += word.length + 1
    }
}
export function word_wrap(text, x_chars, indentation=0) {return [..._word_wrap_generator(text, x_chars, indentation)].join("").trimEnd()}
assertEqualsObject([
    [ word_wrap("this is a test of wrapping", 13, 2), "this is a      test of      wrapping" ],
])
