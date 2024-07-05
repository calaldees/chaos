class CanvasAnimationBase {
    constructor(canvas, fps=60) {
        this.canvas = canvas || document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')

        this.images = {}

        window.addEventListener("focus", () => {this.setRunning(true)} , false)
	    window.addEventListener("blur" , () => {this.setRunning(false)}, false)

        this.keys_pressed = new Set()
        window.addEventListener('keydown', (e) => this.keys_pressed.add(event.key), true)
        window.addEventListener('keyup'  , (e) => this.keys_pressed.delete(event.key), true)
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
            [this.mouse_x, this.mouse_y] = [
                Math.floor((event.layerX/window.innerWidth)*this.w), 
                Math.floor((event.layerY/window.innerHeight)*this.h)
            ]
        }, true)

        this.frame = 0
        this.milliseconds_per_frame = 1000/fps

        this.run()
    }

    get w() {return this.canvas.width}
    get h() {return this.canvas.height}

    clear = () => {
        this.context.clearRect(0, 0, this.w, this.h)
        //c.fillStyle = COLOR.black
        //c.fillRect(0, 0, w, h)
    }

	setRunning = (running) => {
		this.running = running
		console.log("running", running);
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
        if (!this.epoch && time) {this.epoch = time}
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