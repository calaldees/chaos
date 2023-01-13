//units?

// https://zxnet.co.uk/spectrum/chaos/asm/E440.html


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
    "Bat": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white_bright],
        "animSpeed": 20, //?
        "corpseFrame": monster_sprites[4],
        "animSprites": monster_sprites.slice(5,8),
    },
    "Gooey Blob": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 18, //?
        "corpseFrame": monster_sprites[12], // no-corpse?
        "animSprites": monster_sprites.slice(9,12),
    },
    "Dire Wolf": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.yellow_bright],
        "animSpeed": 30,  //?
        "corpseFrame": monster_sprites[17],
        "animSprites": monster_sprites.slice(13,16),
    },
    "Spectre": {
        "animFrames": [0, 0, 0, 0],
        "animColors": [COLOR.white_bright, COLOR.cyan_bright, COLOR.magenta_bright, COLOR.blue_bright],
        "animSpeed": 10,  //?
        "corpseFrame": monster_sprites[18], // no-corpse?
        "animSprites": monster_sprites.slice(17,18),
    },
    "Goblin": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 30, //?
        "animColors": [COLOR.magenta_bright],
        "corpseFrame": monster_sprites[22],
        "animSprites": monster_sprites.slice(19,22),
    },
    "Crocodile": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green], // original was light green
        "animSpeed": 34,  //?
        "corpseFrame": monster_sprites[28],
        "animSprites": monster_sprites.slice(23,26),
    },
    "Green Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 31,  //?
        "corpseFrame": monster_sprites[32],
        "animSprites": monster_sprites.slice(27,31),
    },
    "Magic Fire": {
        "animFrames": [0, 3, 2, 1],
        "animColors": [COLOR.yellow_bright, COLOR.red_bright, COLOR.yellow],
        "animSpeed": 16,
        "animSprites": monster_sprites.slice(63,67),
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
    },
    "Lion": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 27,  //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": monster_sprites[44],
        "animSprites": monster_sprites.slice(39,42),
    },
    "Gryphon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 27,  //?
        "animColors": [COLOR.white],
        "corpseFrame": monster_sprites[46],
        "animSprites": monster_sprites.slice(43,46),
    },
    "Elf": {
        "animFrames": [0, 1, 2, 3, 0],
        "animSpeed": 25,
        "animColors": [COLOR.green_bright],
        "corpseFrame": monster_sprites[50],
        "animSprites": monster_sprites.slice(47,51),
    },
    "Horse": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 23, //?
        "animColors": [COLOR.yellow],
        "corpseFrame": monster_sprites[55],
        "animSprites": monster_sprites.slice(52,55),
    },
    "Orc": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 23, //?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": monster_sprites[58],
        "animSprites": monster_sprites.slice(56,59),
    },
    "Red Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 32, // ?
        "animColors": [COLOR.red_bright],
        "corpseFrame": monster_sprites[63],
        "animSprites": monster_sprites.slice(60,63),
    },
    "Manticore": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 26,  //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": monster_sprites[72],
        "animSprites": monster_sprites.slice(67,71),
    },
    "Troll": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 54, // ?
        "animColors": [COLOR.green],
        "corpseFrame": monster_sprites[74],
        "animSprites": monster_sprites.slice(71,74),
    },
    "Unicorn": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, // ?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": monster_sprites[78],
        "animSprites": monster_sprites.slice(75,78),
    },
    "Ghost": {
        "animFrames": [0, 1, 2, 3],
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSpeed": 32,
        "animSprites": monster_sprites.slice(79,84),
    },
    "Wraith": {
        "animFrames": [0, 1, 3, 2],
        "animSpeed": 61, //?
        "animColors": [COLOR.cyan_bright],
        "animSprites": monster_sprites.slice(83,87),
    },
    "Bear": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, // ?
        "animColors": [COLOR.red],
        "corpseFrame": monster_sprites[92],
        "animSprites": monster_sprites.slice(87,90),
    },
    "Gorilla": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 25, // ?
        "animColors": [COLOR.yellow],
        "corpseFrame": monster_sprites[95],
        "animSprites": monster_sprites.slice(91,95),
    },
    "Skeleton": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 24, // ?
        "animColors": [COLOR.white_bright],
        "corpseFrame": monster_sprites[98],
        "animSprites": monster_sprites.slice(95,98),
    },
    "Ogre": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 17, //?
        "animColors": [COLOR.red_bright],
        "corpseFrame": monster_sprites[102],
        "animSprites": monster_sprites.slice(98,102),
    },
    "Zombie": {
        "animFrames": [3,0,1,2],
        "animSpeed": 30, //?
        "animColors": [COLOR.cyan],
        "animSprites": monster_sprites.slice(102,106),
    },
    "Harpy": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 17, //?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": monster_sprites[109],
        "animSprites": monster_sprites.slice(106,109),
    },
    "Pegasus": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 18, //?
        "animColors": [COLOR.white_bright],
        "corpseFrame": monster_sprites[112],
        "animSprites": monster_sprites.slice(110,113),
    },
    "Eagle": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 19, //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": monster_sprites[117],
        "animSprites": monster_sprites.slice(114,117),
    },
    "Hydra": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 22, //?
        "animColors": [COLOR.green_bright],
        "corpseFrame": monster_sprites[121],
        "animSprites": monster_sprites.slice(118,121),
    },
    "Giant Rat": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 29, //?
        "animColors": [COLOR.white],
        "corpseFrame": monster_sprites[125],
        "animSprites": monster_sprites.slice(122,125),
    },
    "Centaur": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 29, //?
        "animColors": [COLOR.yellow],
        "corpseFrame": monster_sprites[128],
        "animSprites": monster_sprites.slice(126,129),
    },
    "Giant": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, //?
        "animColors": [COLOR.cyan],
        "corpseFrame": monster_sprites[133],
        "animSprites": monster_sprites.slice(130,133),
    },
    "Golden Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 34, //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": monster_sprites[136],
        "animSprites": monster_sprites.slice(134,137),
    },
    "Dark Citadel": {
        "animFrames": [0],
        "animSpeed": 60,  //?
        "animColors": [COLOR.magenta, COLOR.magenta_bright],
        "animSprites": monster_sprites.slice(138,139),
    },
    "Magic Castle": {
        "animFrames": [0],
        "animSpeed": 30,  //?
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSprites": monster_sprites.slice(139,140),
    },
    "Shadow Wood": {
        "animFrames": [0],
        "animSpeed": 27,  //?
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSprites": monster_sprites.slice(140,141),
    },
    "Magic Wood": {
        "animFrames": [0],
        "animSpeed": 21,  //?
        "animColors": [COLOR.green, COLOR.green_bright, COLOR.yellow, COLOR.yellow_bright],
        "animSprites": monster_sprites.slice(141,142),
    },
    "Wall": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.yellow_bright],
        "animSprites": monster_sprites.slice(142,143),
    },
}


class GfxUnit {
    constructor(template) {
        this.template = template
    }

    isDirty(frame) {
        return (frame % this.template.animSpeed) == 0
    }

    _animation_frame(frame) {
        return Math.floor(frame / this.template.animSpeed)
    }
    _unit_frame(frame) {
        return this._animation_frame(frame) % this.template.animFrames.length
    }

    sprite_color(frame) {
        const sprite = this.template.animSprites[this.template.animFrames[this._unit_frame(frame)]]
        const color  = this.template.animColors[this._animation_frame(frame) % this.template.animColors.length]
        return [sprite, color]
    }
}

export const gfx_units = Object.fromEntries(Object.entries(unit_gfx_data)
    .map(
      ([k, v]) => [k, new GfxUnit(v)]
    )
)