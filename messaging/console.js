import { messaging } from "./messaging.js"

import { enumerate } from '../core.js'
import { extract_ansi_colors } from '../gfx/text.js'


// Console
const MAP_ansi_color_to_css = {
    "0": 'color: black;',
    "30": 'color: black;',          "40": 'background-color: black;',
    "31": 'color: darkred;',        "41": 'background-color: darkred;',
    "32": 'color: darkgreen;',      "42": 'background-color: darkgreen;',
    "33": 'color: darkyellow;',     "43": 'background-color: darkyellow;',
    "34": 'color: darkblue;',       "44": 'background-color: darkblue;',
    "35": 'color: darkmagenta;',    "45": 'background-color: darkmagenta;',
    "36": 'color: darkcyan;',       "46": 'background-color: darkcyan;',
    "37": 'color: grey;',           "47": 'background-color: grey;',
    "90": 'color: black;',         "100": 'background-color: black;',
    "91": 'color: red;',           "101": 'background-color: red;',
    "92": 'color: green;',         "102": 'background-color: green;',
    "93": 'color: yellow;',        "103": 'background-color: yellow;',
    "94": 'color: blue;',          "104": 'background-color: blue;',
    "95": 'color: magenta;',       "105": 'background-color: magenta;',
    "96": 'color: cyan;',          "106": 'background-color: cyan;',
    "97": 'color: white;',         "107": 'background-color: white;',
}
messaging.registerHandler('console', (level, message)=>{
    // https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console
    let [text, pos_ansi] = extract_ansi_colors(message)
    const css_styles = []
    for (let [i, [pos, [foreground_color_index, background_color_index]]] of enumerate(pos_ansi)) {
        i = pos+(i*2)
        text = `${text.substring(0,i)}%c${text.substring(i, text.length)}`
        css_styles.push(`${MAP_ansi_color_to_css[foreground_color_index]} ${MAP_ansi_color_to_css[background_color_index]}`)
    }
    console[level.description](text, ...css_styles)
})
