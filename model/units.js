//units?

// https://zxnet.co.uk/spectrum/chaos/asm/E440.html
// https://github.com/lewster32/archaos/blob/main/assets/data/classicunits.json


class UnitTemplate {
    constructor(template, owner) {
    }
}

export class Unit {
    constructor(template, owner, status) {
        this.template = template
        this.owner = owner
        this.status = new Set()
    }

    dirty(frame) {
        return (frame % this.template.animSpeed) == 0
    }

    animation_frame(frame) {
        return Math.floor(frame / this.template.animSpeed)
    }
    unit_frame(frame) {
        return this.animation_frame(frame) % this.template.animFrames.length
    }

    sprite_color(unit_frame) {
        const sprite = this.template.animSprites[this.template.animFrames[unit_frame]]
        const color = this.template.animColors[unit_frame % this.template.animColors.length]
        return [sprite, color]
    }
}