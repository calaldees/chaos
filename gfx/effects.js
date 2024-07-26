import { filterInPlace, Dimension } from "../core.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const BORDER_OFFSET_PX = 8  // Probably needs to be passed rather than a constant? Maybe the context can be transposed?
const CELL_SIZE_PX = 16
const dimension = new Dimension(15, 10)
function i_to_xy(i) {
    return [...dimension.index_to_position(i)].map(j=>Math.floor(j*CELL_SIZE_PX)+BORDER_OFFSET_PX).slice(0,2)
}


export class _GfxEffect {
    get active() {return true}
}

export class SpriteEffect extends _GfxEffect {
    constructor(sprites, i) {
        super()  //...arguments
        this.sprites = sprites
        this.i = i
    }
    draw(c, frame) {
        if (frame % 16 != 0) {return}
        const f = Math.floor(frame/16)%this.sprites.length
        const [_x, _y] = i_to_xy(this.i)
        c.clearRect(_x,_y,CELL_SIZE_PX,CELL_SIZE_PX)
        c.drawImage(this.sprites[f], _x, _y)
    }
}

export class HighlightEffect extends _GfxEffect {
    constructor(color, indexs, alpha=0.1, frame_duration=16, frame_alpha_multiplier=0.05) {
        super()
        this.color = color
        this.indexs = indexs
        this.alpha = alpha
        this.frame_duration = frame_duration
        this.frame_alpha_multiplier = frame_alpha_multiplier
    }
    draw(c, frame) {
        c.save()
        c.globalAlpha = this.alpha //+ ((frame % this.frame_duration)-(this.frame_duration/2))*this.frame_alpha_multiplier
        for (let i of this.indexs) {
            c.fillStyle = this.color
            c.fillRect(...i_to_xy(i), CELL_SIZE_PX, CELL_SIZE_PX)
        }
        c.restore()
    }
}

export class VectorEffect extends _GfxEffect {
    draw(c, frame) {}
}

export class GfxEffects {
    constructor() {
        this.effects = []
    }
    clear() {
        this.effects = []
    }
    addEffect(effect) {
        // assert is _GfxEffect?
        this.effects.push(effect)
    }
    draw(c, frame) {
        for (let effect of this.effects) {
            effect.draw(c, frame)
        }
        filterInPlace(this.effects, (effect)=>effect.active, this)
    }
}