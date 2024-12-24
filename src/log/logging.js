const MessageType = Object.freeze({
    log: Symbol("log"),
    info: Symbol("info"),
    debug: Symbol("debug"),
    warning: Symbol("warning"),
    error: Symbol("error"),
})

class Logging {
    constructor() {
        Object.defineProperty(this, "handlers", {writable: false, enumerable: true, value: {}})
        Object.defineProperty(this, "history", {writable: false, enumerable: true, value: []})
    }
    registerHandler = (name, handler) => {
        console.assert(typeof handler === 'function', "message handler must be a function")
        this.handlers[name] = handler
    }
    log = (m) => {this.message(MessageType.log, m)}
    info = (m) => {this.message(MessageType.info, m)}
    debug = (m) => {this.message(MessageType.debug, m)}
    warning = (m) => {this.message(MessageType.warning, m)}
    error = (m) => {this.message(MessageType.error, m)}
    message = (level, message) => {
        this.history.push([Math.floor(Date.now() / 1000), level, message])
        Object.values(this.handlers).forEach((h)=>h(level, message))
    }
}

export const logging = new Logging()