//units?

// https://zxnet.co.uk/spectrum/chaos/asm/E440.html
// https://github.com/lewster32/archaos/blob/main/assets/data/classicunits.json


class UnitTemplate {
    constructor(template, owner) {
    }
}

class Unit {
    constructor(template, owner, status) {
        this.template = template
        this.owner = owner
        this.illusion = illusion
        this.undead = undead
    }

    unit_frame(frame) {
        return Math.floor(frame / this.template.animation_delay) % this.template.frames.length
    }

    sprite(frame) {
        const [sprite_frame, color] = this.template.frames[this.unit_frame(frame)]
        return [this.template.sprites[sprite_frame], color]
    }
}