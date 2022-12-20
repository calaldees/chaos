// https://en.wikipedia.org/wiki/ZX_Spectrum_graphic_modes#Colour_palette
const COLOR = {
    /*
    0 	0 	0 	0 	0 	#000 	Black 	0 	0 	0 	1 	#000 	Black
    1 	0 	0 	1 	0 	#00E 	Blue 	0 	0 	1 	1 	#00F 	Bright Blue
    2 	0 	1 	0 	0 	#E0 	Red 	0 	1 	0 	1 	#F00 	Bright Red
    3 	0 	1 	1 	0 	#E0E 	Magenta 	0 	1 	1 	1 	#F0F 	Bright Magenta
    4 	1 	0 	0 	0 	#0E0 	Green 	1 	0 	0 	1 	#0F0 	Bright Green
    5 	1 	0 	1 	0 	#0EE 	Cyan 	1 	0 	1 	1 	#0FF 	Bright Cyan
    6 	1 	1 	0 	0 	#EE0 	Yellow 	1 	1 	0 	1 	#FF0 	Bright Yellow
    7 	1 	1 	1 	0 	#EEE 	White 	1 	1 	1 	1 	#FFF 	Bright White
    */
}

function shiftImage(imageBitmap, color) {
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

export {
    shiftImage,
}