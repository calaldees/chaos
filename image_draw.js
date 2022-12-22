// https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes#Colour_palette

export const COLOR = {
    black: "#000",
    blue: "#00E",
    red: "#E00",
    magenta: "#E0E",
    green: "#0E0",
    cyan: "#0EE",
    yellow: "#EE0",
    white: "#EEE",
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
