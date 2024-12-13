import { messaging } from './messaging.js'
import {drawFont_color} from '../gfx/text.js'

window.addEventListener('resize', () => {
    document.getElementById("log").style = `display: ${(window.innerWidth / window.innerHeight) <= 1.5 ? "none": "block"}`;
    console.log(document.getElementById("log").style)
}, false);

const canvas = document.querySelector("#log canvas")
const c = canvas.getContext('2d')

let pos = 0
messaging.registerHandler("log", (level, message)=>drawFont_color(c, message, 0, pos+=16))
