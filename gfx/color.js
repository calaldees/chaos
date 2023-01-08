// https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes#Colour_palette

export const COLOR = {
    black: "#000",
    blue: "#00D",
    red: "#D00",
    magenta: "#D0D",
    green: "#0D0",
    cyan: "#0DD",
    yellow: "#DD0",
    white: "#DDD",

    black_bright: "#000",
    blue_bright: "#00F",
    red_bright: "#F00",
    magenta_bright: "#F0F",
    green_bright: "#0F0",
    cyan_bright: "#0FF",
    yellow_bright: "#FF0",
    white_bright: "#FFF",
}

export function shiftImage(imageBitmap, color) {
    const w = imageBitmap.width
    const h = imageBitmap.height
    const o = new OffscreenCanvas(w, h)
    const c = o.getContext("2d")

    c.drawImage(imageBitmap, 0, 0)
    c.globalCompositeOperation = "source-in"
    c.fillStyle = color
    c.fillRect(0,0,w,h)
    
    return o.transferToImageBitmap()
}
