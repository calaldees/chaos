import { filterInPlace, Dimension } from "../core.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const BORDER_OFFSET_PX = 8  // Probably needs to be passed rather than a constant? Maybe the context can be transposed?
const CELL_SIZE_PX = 16
const dimension = new Dimension(15, 10)

export class _GfxEffect {
    get active() {return true}
}

function i_to_xy(i) {
    return [...dimension.index_to_position(i)].map(j=>Math.floor(j*CELL_SIZE_PX)+BORDER_OFFSET_PX)
}

export class SpriteEffect extends _GfxEffect {
    constructor(sprites, i) {
        super(...arguments)
        this.sprites = sprites
        this.i = i
    }

    draw(c, frame) {
        if (frame%8 != 0) {return}
        const f = Math.floor(frame/8)%this.sprites.length
        const [_x, _y] = i_to_xy(this.i)
        c.clearRect(_x,_y,16,16)
        c.drawImage(this.sprites[f], _x, _y)
    }
}

export class HighlightEffect extends _GfxEffect {
    draw(c, frame) {}
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