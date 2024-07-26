class CanvasAnimationBase {
    constructor(canvas, fps=60) {
        this.canvas = canvas || document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.images = {}

        window.addEventListener("focus", () => {this.setRunning(true)} , false)
	    window.addEventListener("blur" , () => {this.setRunning(false)}, false)

        this.keys_pressed = new Set()
        window.addEventListener('keydown', (e) => this.keys_pressed.add(e.key), true)
        window.addEventListener('keyup'  , (e) => this.keys_pressed.delete(e.key), true)
        this.mouse_x = 0
        this.mouse_y = 0
        this.canvas.addEventListener('mousemove', (e) => {
            /*
            // The mouse x needs correcting to the amount of x visible
            // I have no idea how this aspect ratio correction works - I just messed about with it until I get something looking reasonable
            const canvas_aspect_ratio = (this.w / this.h)
            const view_aspect_ratio = (window.innerWidth / window.innerHeight);
            const aspect_x_correction = view_aspect_ratio/canvas_aspect_ratio;
            const x_offset = Math.floor((this.w/window.innerWidth/2)*this.w/2);
            This works when the width is cropped
                Math.floor((event.layerX*aspect_x_correction/window.innerWidth)*this.w)+x_offset, 
            */
            // Mouse pos only works with full screen and correct aspect ratio
            //[this.mouse_x, this.mouse_y] = [
            //    Math.floor((e.layerX/window.innerWidth)*this.w), 
            //    Math.floor((e.layerY/window.innerHeight)*this.h)
            //]

            let y_offset = 0
            let x_offset = 0
            let canvas_display_width = window.innerWidth
            let canvas_display_height = window.innerHeight
            if (this.canvas_aspect_ratio > this.window_aspect_ratio) { // window is taller
                canvas_display_height = this.h * (window.innerWidth / this.window_aspect_ratio)
                y_offset = (window.innerHeight - canvas_display_height) / 2
            } else { // window is wider
                canvas_display_width = this.w * (window.innerHeight * this.window_aspect_ratio)
                x_offset = (window.innerWidth - canvas_display_width) / 2
            }
            this.mouse_x = ((e.layerX-x_offset)/(window.innerWidth-(x_offset*2)))*this.w
            this.mouse_y = ((e.layerY-y_offset)/(window.innerHeight-(y_offset*2)))*this.h
            console.log(this.mouse_x, this.mouse_y)

            /*

            |
            |100
            |
            1000

            100 / 1000 = 0.1

            |
            |1000
            |
            100

            1000 / 100 = 10

            aspect 1:1 = 100x100
            Actual res 10x10 and enlarged


            (1000 - 100)/2 = 450 y_offset

            if canvas_aspect > window_aspect (== taller than)
              y_off = - (window.height - canvas.height) / 2   // remove the excess y
              or
              x_off = - (window.width - canvas.width) / 2
            tx = ((ex-x_off)/(window.width-(x_off*2)))*canvas.width
            ty = (ey-y_off/(window.height-(y_off*2))*canvas.height
            */
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