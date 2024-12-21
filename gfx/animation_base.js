class CanvasAnimationBase {
    constructor(canvas, fps=60) {
        this.canvas = canvas || document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.audioContext = undefined
        this.audio = document.getElementById('audio')
        if (!this.audio) {
            this.audio = new Audio()
            document.body.appendChild(this.audio)
        }
        this.audio.addEventListener("loadeddata", (e) => {
            this.audio.play()
        })

        this.images = {}

        window.addEventListener("focus", () => {this.setRunning(true)} , false)
        window.addEventListener("blur" , () => {this.setRunning(false)}, false)
        window.addEventListener("mousedown", (e) => this.init_audio(), false)

        this.keys_pressed = new Set()
        window.addEventListener('keydown'  , (e) => this.keys_pressed.add(e.key), true)
        window.addEventListener('keyup'    , (e) => this.keys_pressed.delete(e.key), true)
        window.addEventListener("mousedown", (e) => this.keys_pressed.add(`mouse${e.button}`), true)
        window.addEventListener("mouseup"  , (e) => this.keys_pressed.delete(`mouse${e.button}`), true)
        this.mouse_x = 0
        this.mouse_y = 0
        this.canvas.addEventListener('mousemove', (e) => {
            const r = e.target.getBoundingClientRect()
            this.mouse_x = Math.floor((e.clientX - r.left) / (this.canvas.clientWidth/this.canvas.width))
            this.mouse_y = Math.floor((e.clientY - r.top ) / (this.canvas.clientHeight/this.canvas.height))
        }, true)

        this.frame = 0
        this.milliseconds_per_frame = 1000/fps

        //this.setRunning(true)  // race hazzard in starting?
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}
    get canvas_aspect_ratio() {return this.w / this.h}
    get window_aspect_ratio() {return window.innerWidth / window.innerHeight}

    clear = () => {
        this.context.clearRect(0, 0, this.w, this.h)
        //c.fillStyle = COLOR.black
        //c.fillRect(0, 0, w, h)
    }

    setRunning = (running) => {
        console.log("setRunning", running)
        this.running = running
        if (!this.running && this.requestAnimationFrameId) {
            cancelAnimationFrame(this.requestAnimationFrameId)
            this.requestAnimationFrameId = undefined;
        } else if (running && !this.requestAnimationFrameId) {
            this.run()
        }
    }

    load_image = (name, url) => {
        const images = this.images
        images[name] = new Image()
        images[name].onload = function() {images[name] = this}
        images[name].src = url
    }

    init_audio = () => {
        this.audioContext = this.audioContext || new AudioContext()
    }
    play_audio = (url) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
        this.audio.src = url
    }

    run = (time) => {
        if (this.keys_pressed.has("Escape")) {this.setRunning(false)}
        if (!time) {this.epoch = undefined}
        if (!this.epoch && time) {this.epoch = time - (this.frame * this.milliseconds_per_frame)}
        const frame = Math.floor((time - this.epoch) / this.milliseconds_per_frame)
        for ( ; this.frame<frame ; this.frame++) {
            this.loop(this.context, this.frame)
        }
        if (this.running) {this.requestAnimationFrameId = requestAnimationFrame(this.run)}
    }
    drawLine(c, x1,y1,x2,y2,color='white',lineWidth=1) {
        c.strokeStyle = color
        c.lineWidth = lineWidth
        c.beginPath()
        c.moveTo(x1, y1)
        c.lineTo(x2, y2)
        c.stroke()
    }
    loop(context, frame) {
        throw Exception("Not Implemented Error")
    }
}

export {CanvasAnimationBase}