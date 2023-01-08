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