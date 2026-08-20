import { enumerate, filterInPlace } from "../core.js"
import { COLOR, shiftImage } from "./color.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const CELL_SIZE_PX = 16


export class _GfxEffect {
    constructor(active_iterations) {
        this.active_iterations = active_iterations
        this.dirty = true
    }
    get active() {
        if (typeof(this.active_iterations) == 'number') {
            this.active_iterations -= 1
            this.markDirty()
        }
        return Boolean(this.active_iterations)
    }
    set active(active_iterations) {
        if (this.active_iterations != active_iterations) {this.markDirty()}
        this.active_iterations = active_iterations
    }
    markDirty() {this.dirty = true}
    isDirty(frame) {  // bool
        if (this.dirty) {
            this.dirty = false
            return true
        }
        return false
    }
}

export class SpriteEffect extends _GfxEffect {
    constructor(sprite, color) {
        super(true)
        this.sprite = sprite
        this.color = color
    }
    draw(c, frame) {
        c.drawImage(shiftImage(this.sprite, this.color || COLOR.white), 0, 0)
    }
}


export class SpriteAnimationEffect extends _GfxEffect {
    constructor(sprites) {
        super()
        this.sprites = sprites
    }
    isDirty(frame) {
        return super.isDirty(frame) || frame % 16 == 0  // hack
    }
    draw(c, frame) {
        const f = Math.floor(frame/16)%this.sprites.length
        c.drawImage(this.sprites[f], 0, 0)  // can the 0,0 be left out? are the defaults 0?
    }
}

export class HighlightEffect extends _GfxEffect {
    constructor(color=COLOR.yellow, alpha=0.4, frame_duration=16, frame_alpha_multiplier=0.05) {
        super(true)
        this.color = color
        //this.indexes = indexes
        this.alpha = alpha
        this.frame_duration = frame_duration
        this.frame_alpha_multiplier = frame_alpha_multiplier
    }
    isDirty(frame) {
        return super.isDirty(frame) || frame % 16 == 0  // hack
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

export class InvertEffect extends _GfxEffect {
    constructor(active_iterations=undefined) {
        super(active_iterations)
    }
    isDirty(frame) {
        return super.isDirty(frame) || frame % 300
    }
    draw(c, frame) {
        c.save()
        c.globalCompositeOperation='difference'
        c.fillStyle='white'
        c.fillRect(0, 0, CELL_SIZE_PX, CELL_SIZE_PX)
        c.restore()
    }
}

export class GfxEffects {
    constructor(size) {
        this.size = size
        this.data = new Array(this.size)
        for (let i=0 ; i<this.data.length ; i++) {this.data[i]=new Array()}
    }
    clear() {
        for (let i=0 ; i<this.data.length ; i++) {this.data[i].length = 0}
    }
    addEffect(i, effect) {
        this.data[i].push(effect)
    }
    expireInactive() {
        for (let effects of this.data) {
            filterInPlace(effects, (effect)=>effect && effect.active)
        }
    }
    * dirtyIndexes(frame) {
        for (let [i, effects] of enumerate(this.data)) {
            if (effects.some((effect)=>effect.isDirty(frame))) {
                yield i
            }
        }
    }
    draw(c, frame, i) {
        for (let effect of this.data[i]) {
            effect.draw(c, frame)
        }
    }
}