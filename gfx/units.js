//units?

// https://zxnet.co.uk/spectrum/chaos/asm/E440.html
// https://github.com/lewster32/archaos/blob/main/assets/data/classicunits.json

import { COLOR } from './color.js'

import { monster_sprites } from './sprites.js'


const unit_gfx_data = {
    "King Cobra" : {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 24,
        "corpseFrame": monster_sprites[8],
        "animSprites": monster_sprites.slice(1,4),
    },
    "Dire Wolf": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white],
        "animSpeed": 30,  //?
        "corpseFrame": monster_sprites[17],
        "animSprites": monster_sprites.slice(13,16),
    },
    "Crocodile": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green],
        "animSpeed": 34,  //?
        "corpseFrame": monster_sprites[28],
        "animSprites": monster_sprites.slice(23,26),
    },
    "Ghost": {
        "animFrames": [0, 1, 2, 3],
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSpeed": 32,
        "animSprites": monster_sprites.slice(79,84),
    },
    "Faun": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white],
        "animSpeed": 40, //?
        "corpseFrame": monster_sprites[40],
        "animSprites": monster_sprites.slice(35,38),
    },
    "Vampire": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.red],
        "animSpeed": 10, //?
        "corpseFrame": monster_sprites[34],
        "animSprites": monster_sprites.slice(31,34),
    }
}


class GfxUnit {
    constructor(template) {
        this.template = template
    }

    isDirty(frame) {
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

export const gfx_units = Object.fromEntries(Object.entries(unit_gfx_data)
    .map(
      ([k, v]) => [k, new GfxUnit(v)]
    )
)