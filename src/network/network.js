import { isObject } from '../core.js';
import { getId } from './id.js'

const id = getId()

export class NetworkManager {
    constructor(channel, gzip_length_threshold=500) {
        const urlParams = new URLSearchParams(window.location.search);
        this.websocket_url = urlParams.get('websocket_url') || `${window.location.protocol.startsWith("https")?"wss":"ws"}://${window.location.host}/`
        this.websocket_url += `${channel}.ws`
        this.onMessageListeners = new Set()
        this.channel = channel
        this.gzip_length_threshold = gzip_length_threshold
        this.socket = undefined
        this.connect()
    }

    addOnMessageListener = (listener) => {this.onMessageListeners.add(listener)}
    removeOnMessageListener = (listener) => {this.onMessageListeners.delete(listener)}

    connect = () => {
        if (this.socket) {return console.warning("socket already connected")}
        console.log("socket connecting", this.websocket_url)
        this.socket = new WebSocket(this.websocket_url)
        this.socket.addEventListener("open", this.open)
        this.socket.addEventListener("message", this.message)
        this.socket.addEventListener("close", this.close)
    }
    open = (event) => {
        console.log('socket open')
    }
    close = (event) => {
        console.error('socket close')
        if (this.socket) {this.socket.close()}
        this.socket = undefined
    }
    message = (msg) => {
        (async () => {
            let data = msg.data
            //if (typeof data == 'string') {return console.error('socket failed recv - expected binary - got string', data)}
            if (data.stream) {  // Only decompress binary messages (leave text as is)
                try {data = await new Response(data.stream().pipeThrough(new DecompressionStream("gzip"))).text()}
                catch (ex) {return console.error("socket failed recv - decompress error", ex)}
            }
            if (typeof data == "string") {
                try {data = JSON.parse(data)}
                catch (ex) {return console.error("socket failed recv - json-decode", ex)}
            }
            //if (data.from == id) {return console.error('socket - message from self - not possible - !?')}
            for (let listener of this.onMessageListeners) {listener(data)}
        })()
    }
    send = (data) => {
        (async () => {
            if (!this.socket || this.socket.readyState!=WebSocket.OPEN) {
                return console.warn("socket failed send - not connected", data)
            }
            if (isObject(data)) {
                data.from = id  // append from:id to every message
            }
            if (typeof data != "string") {
                try {data = JSON.stringify(data)}
                catch (ex) {return console.error("socket failed send - JSON.stringify", ex)}
            }
            if (data.length > this.gzip_length_threshold) {
                try {data = await (new Response(new Blob([data]).stream().pipeThrough(new CompressionStream('gzip')))).blob()}
                catch (ex) {return console.error('socket failed send - compress error', ex)}
            }
            try {this.socket.send(data)}
            catch (ex) {return console.warn("socket failed send", ex)}
        })()
    }
}
