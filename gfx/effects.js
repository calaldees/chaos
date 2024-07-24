import { filterInPlace, Dimension } from "../core.js"

// These are duplicated in 'map' and 'map_model' - I am sad at this
const BORDER_OFFSET = 8  // Probably needs to be passed rather than a constant? Maybe the context can be transposed?
const CELL_SIZE_PX = 16
const dimension = new Dimension(15, 10)

export class _GfxEffect {
    get hasExpired() {return false}
}

export class SpriteEffect extends _GfxEffect {
    constructor(sprites) {
        this.sprites = sprites
    }

    draw(c, frame) {}
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
        filterInPlace(this.effects, (effect)=>effect.hasExpired, this)
    }
}