import { enumerate, filterInPlace } from "../core.js"
import { COLOR, shiftImage } from "./color.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const CELL_SIZE_PX = 16


export class _GfxEffect {
    get active() {return true}
}

export class SpriteEffect {
    constructor(sprite, color) {
        this.sprite = sprite
        this.color
        this.active = true
    }
    isDirty(frame) {
        return false
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
        return frame % 16 == 0  // hack
    }
    draw(c, frame) {
        const f = Math.floor(frame/16)%this.sprites.length
        c.drawImage(this.sprites[f], 0, 0)  // can the 0,0 be left out? are the defaults 0?
    }
}

export class HighlightEffect extends _GfxEffect {
    constructor(color=COLOR.yellow, alpha=0.4, frame_duration=16, frame_alpha_multiplier=0.05) {
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

export class InvertEffect extends _GfxEffect {
    isDirty(frame) {
        return frame % 300
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
        this.clear()
    }
    clear() {
        this.data = new Array(this.size)
        for (let i=0 ; i<this.data.length ; i++) {this.data[i]=new Array()}
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