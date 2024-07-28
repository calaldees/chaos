import { enumerate } from "../core.js"
import { COLOR } from "./color.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const CELL_SIZE_PX = 16


export class _GfxEffect {
    get active() {return true}
}

export class SpriteEffect extends _GfxEffect {
    constructor(sprites) {
        super()
        this.sprites = sprites
    }
    isDirty(frame) {
        return frame % 16 == 0  // hack
    }
    draw(c, frame) {
        debugger
        const f = Math.floor(frame/16)%this.sprites.length
        c.drawImage(this.sprites[f], 0, 0)  // can the 0,0 be left out? are the defaults 0?
    }
}

export class HighlightEffect extends _GfxEffect {
    constructor(color=COLOR.yellow, alpha=0.1, frame_duration=16, frame_alpha_multiplier=0.05) {
        super()
        this.color = color
        //this.indexes = indexes
        this.alpha = alpha
        this.frame_duration = frame_duration
        this.frame_alpha_multiplier = frame_alpha_multiplier
    }
    isDirty(frame) {
        return frame % 16 == 0  // hack
    }
    draw(c, frame) {
        c.save()
        c.globalAlpha = this.alpha //+ ((frame % this.frame_duration)-(this.frame_duration/2))*this.frame_alpha_multiplier
        c.fillStyle = this.color
        c.fillRect(0, 0, CELL_SIZE_PX, CELL_SIZE_PX)
        c.restore()
    }
}

export class VectorEffect extends _GfxEffect {
    draw(c, frame) {}
}

export class GfxEffects {
    constructor(size) {
        this.data = new Array(size)
    }
    clear() {
        throw Error()
    }
    addEffect(effect, i) {
        // assert is _GfxEffect?
        this.data[i] = effect
    }
    * dirtyIndexes(frame) {
        for (let [i, gfx_effect] of enumerate(this.data)) {
            if (!gfx_effect) {continue}
            if (gfx_effect.isDirty(frame)) {
                yield i
            }
        }
    }
    draw(c, frame, i) {
        this.data[i]?.draw(c, frame)
    }
}