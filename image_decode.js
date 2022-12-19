function* hexToBytes(hex) {
    console.assert(hex.length % 2 == 0)
    for (let c = 0; c < hex.length; c += 2) {
        yield parseInt(hex.substr(c, 2), 16)
    }
}

const WHITE_PIXEL = [255,255,255,255]
const BLACK_PIXEL = [0,0,0,0]
function* bytesToMonoImageDataArray(bytes) {
    for (let byte of bytes) {
        for (let i=7 ; i>=0 ; i+=-1) {
            yield* (byte >> i) % 2 ? WHITE_PIXEL : BLACK_PIXEL
        }
    }
}

function* bytesToMono8x8ImageDataChunks(bytesIterable) {
    const bytes = []
    for (let byte of bytesIterable) {
        bytes.push(byte)
        if (bytes.length==8) {
            yield new ImageData(new Uint8ClampedArray(bytesToMonoImageDataArray(bytes)), 8, 8)
            bytes.length = 0
        }
    }
}

const nonHexRegex = new RegExp('[^0-9a-f]+', 'gi')
function hexStringTo8x8ImageDataChunks(hexString) {
    return [...bytesToMono8x8ImageDataChunks(hexToBytes(hexString.replaceAll(nonHexRegex, "")))]
}

function ImageData4ToImageBitmap(imageDataArray) {
    console.assert(imageDataArray.length == 4)
    const offscreen = new OffscreenCanvas(16, 16)
    const c = offscreen.getContext("2d")
    c.putImageData(imageDataArray[0], 0, 0)
    c.putImageData(imageDataArray[1], 8, 0)
    c.putImageData(imageDataArray[2], 0, 8)
    c.putImageData(imageDataArray[3], 8, 8)
    return offscreen.transferToImageBitmap()
}

export {
    hexStringTo8x8ImageDataChunks,
    ImageData4ToImageBitmap,
}