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

// TODO - move to somewhere - this does more than color now
export function shiftImage(imageBitmap, color, flip=0) {
    // flip bitmask - 1=flipX 2=flipY 3=flipX+flipY
    const w = imageBitmap.width
    const h = imageBitmap.height
    const o = new OffscreenCanvas(w, h)
    const c = o.getContext("2d")

    // flip
    c.save();
    c.scale(flip&1?-1:1, flip&2?-1:1);
    c.drawImage(imageBitmap, flip&1?-w:0, flip&2?-h:0);
    c.restore();
    // notes for no-flip
    //c.drawImage(imageBitmap, 0, 0)

    c.globalCompositeOperation = "source-in"
    c.fillStyle = color
    c.fillRect(0,0,w,h)
    
    return o.transferToImageBitmap()
}
