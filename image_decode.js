const nonHexRegex = new RegExp('[^0-9a-f]+', 'gi')
function cleanHexString(hex_string) {return hex_string.toLowerCase().replaceAll(nonHexRegex, "")}
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

function ImageDataToImageBitmap(imageDataArray) {
    const size = Math.sqrt(imageDataArray.length) * 8
    const offscreen = new OffscreenCanvas(size, size)
    const c = offscreen.getContext("2d")
    if (imageDataArray.length == 1) {
        c.putImageData(imageDataArray[0], 0, 0)
    } else 
    if (imageDataArray.length == 4) {
        c.putImageData(imageDataArray[0], 0, 0)
        c.putImageData(imageDataArray[1], 8, 0)
        c.putImageData(imageDataArray[2], 0, 8)
        c.putImageData(imageDataArray[3], 8, 8)
    } else {
        throw `unable to process imageDataArray`
    }
    return offscreen.transferToImageBitmap()
}

const BASE64_HEAD = "data:application/octet;base64,"
function base64ToUint8Array(base64_string) {
    base64_string = base64_string.startsWith(BASE64_HEAD) ? base64_string.substr(BASE64_HEAD.length) : base64_string
    return Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))  // https://stackoverflow.com/a/41106346/3356840
    // await (await fetch("data:application/octet;base64," + base64data)).arrayBuffer()
    // https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer#comment124033543_49273187
}

export function loadImage(data) {
    if (typeof(data) == "string" && data.startsWith("data:")) {throw "do some base64 decoding shiz"}
    if (typeof(data) == "string") {data = hexToBytes(cleanHexString(data))}
    return ImageDataToImageBitmap([...bytesToMono8x8ImageDataChunks(data)])
}
export function* loadImages(data) {
    if (typeof(data) == "string") {data = hexToBytes(cleanHexString(data))}
    const chunks = []
    for (let Mono8x8ImageDataChunk of bytesToMono8x8ImageDataChunks(data)) {
        chunks.push(Mono8x8ImageDataChunk)
        if (chunks.length==4) {
            yield ImageDataToImageBitmap(chunks)
            chunks.length = 0
        }
    }
}

