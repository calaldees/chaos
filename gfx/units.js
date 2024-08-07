//units?

// https://zxnet.co.uk/spectrum/chaos/asm/E440.html


import { COLOR } from './color.js'
import { sprites } from './sprites.js'


const unit_gfx_data = {
    "King Cobra" : {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 24,
        "corpseFrame": sprites.monster[8],
        "animSprites": sprites.monster.slice(1,4),
    },
    "Bat": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white_bright],
        "animSpeed": 20, //?
        "corpseFrame": sprites.monster[4],
        "animSprites": sprites.monster.slice(5,8),
    },
    "Gooey Blob": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 18, //?
        "corpseFrame": sprites.monster[12], // no-corpse?
        "animSprites": sprites.monster.slice(9,12),
    },
    "Dire Wolf": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.yellow_bright],
        "animSpeed": 30,  //?
        "corpseFrame": sprites.monster[16],
        "animSprites": sprites.monster.slice(13,16),
    },
    "Spectre": {
        "animFrames": [0, 0, 0, 0],
        "animColors": [COLOR.white_bright, COLOR.cyan_bright, COLOR.magenta_bright, COLOR.blue_bright],
        "animSpeed": 10,  //?
        "corpseFrame": sprites.monster[18], // no-corpse?
        "animSprites": sprites.monster.slice(17,18),
    },
    "Goblin": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 30, //?
        "animColors": [COLOR.magenta_bright],
        "corpseFrame": sprites.monster[22],
        "animSprites": sprites.monster.slice(19,22),
    },
    "Crocodile": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green], // original was light green
        "animSpeed": 34,  //?
        "corpseFrame": sprites.monster[26],
        "animSprites": sprites.monster.slice(23,26),
    },
    "Green Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 31,  //?
        "corpseFrame": sprites.monster[30],
        "animSprites": sprites.monster.slice(27,30),
    },
    "Magic Fire": {
        "animFrames": [0, 3, 2, 1],
        "animColors": [COLOR.yellow_bright, COLOR.red_bright, COLOR.yellow],
        "animSpeed": 16,
        "animSprites": sprites.monster.slice(63,67),
    },
    "Faun": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white],
        "animSpeed": 40, //?
        "corpseFrame": sprites.monster[38],
        "animSprites": sprites.monster.slice(35,38),
    },
    "Vampire": {
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.red],
        "animSpeed": 10, //?
        "corpseFrame": sprites.monster[34],
        "animSprites": sprites.monster.slice(31,34),
    },
    "Lion": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 27,  //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": sprites.monster[42],
        "animSprites": sprites.monster.slice(39,42),
    },
    "Gryphon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 27,  //?
        "animColors": [COLOR.white],
        "corpseFrame": sprites.monster[46],
        "animSprites": sprites.monster.slice(43,46),
    },
    "Elf": {
        "animFrames": [0, 1, 2, 3, 0],
        "animSpeed": 25,
        "animColors": [COLOR.green_bright],
        "corpseFrame": sprites.monster[51],
        "animSprites": sprites.monster.slice(47,51),
    },
    "Horse": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 23, //?
        "animColors": [COLOR.yellow],
        "corpseFrame": sprites.monster[55],
        "animSprites": sprites.monster.slice(52,55),
    },
    "Orc": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 23, //?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": sprites.monster[59],
        "animSprites": sprites.monster.slice(56,59),
    },
    "Red Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 32, // ?
        "animColors": [COLOR.red_bright],
        "corpseFrame": sprites.monster[30],
        "animSprites": sprites.monster.slice(60,63),
    },
    "Manticore": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 26,  //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": sprites.monster[70],
        "animSprites": sprites.monster.slice(67,70),
    },
    "Troll": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 54, // ?
        "animColors": [COLOR.green],
        "corpseFrame": sprites.monster[74],
        "animSprites": sprites.monster.slice(71,74),
    },
    "Unicorn": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, // ?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": sprites.monster[78],
        "animSprites": sprites.monster.slice(75,78),
    },
    "Ghost": {
        "animFrames": [0, 1, 2, 3],
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSpeed": 32,
        "animSprites": sprites.monster.slice(79,84),
    },
    "Wraith": {
        "animFrames": [0, 1, 3, 2],
        "animSpeed": 61, //?
        "animColors": [COLOR.cyan_bright],
        "animSprites": sprites.monster.slice(83,87),
    },
    "Bear": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, // ?
        "animColors": [COLOR.red],
        "corpseFrame": sprites.monster[90],
        "animSprites": sprites.monster.slice(87,90),
    },
    "Gorilla": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 25, // ?
        "animColors": [COLOR.yellow],
        "corpseFrame": sprites.monster[94],
        "animSprites": sprites.monster.slice(91,94),
    },
    "Skeleton": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 24, // ?
        "animColors": [COLOR.white_bright],
        "animSprites": sprites.monster.slice(95,98),
    },
    "Ogre": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 17, //?
        "animColors": [COLOR.red_bright],
        "corpseFrame": sprites.monster[101],
        "animSprites": sprites.monster.slice(98,101),
    },
    "Zombie": {
        "animFrames": [3,0,1,2],
        "animSpeed": 30, //?
        "animColors": [COLOR.cyan],
        "animSprites": sprites.monster.slice(102,106),
    },
    "Harpy": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 17, //?
        "animColors": [COLOR.cyan_bright],
        "corpseFrame": sprites.monster[109],
        "animSprites": sprites.monster.slice(106,109),
    },
    "Pegasus": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 18, //?
        "animColors": [COLOR.white_bright],
        "corpseFrame": sprites.monster[113],
        "animSprites": sprites.monster.slice(110,113),
    },
    "Eagle": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 19, //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": sprites.monster[117],
        "animSprites": sprites.monster.slice(114,117),
    },
    "Hydra": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 22, //?
        "animColors": [COLOR.green_bright],
        "corpseFrame": sprites.monster[121],
        "animSprites": sprites.monster.slice(118,121),
    },
    "Giant Rat": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 29, //?
        "animColors": [COLOR.white],
        "corpseFrame": sprites.monster[125],
        "animSprites": sprites.monster.slice(122,125),
    },
    "Centaur": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 29, //?
        "animColors": [COLOR.yellow],
        "corpseFrame": sprites.monster[129],
        "animSprites": sprites.monster.slice(126,129),
    },
    "Giant": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 33, //?
        "animColors": [COLOR.cyan],
        "corpseFrame": sprites.monster[133],
        "animSprites": sprites.monster.slice(130,133),
    },
    "Golden Dragon": {
        "animFrames": [0, 1, 2, 1],
        "animSpeed": 34, //?
        "animColors": [COLOR.yellow_bright],
        "corpseFrame": sprites.monster[137],
        "animSprites": sprites.monster.slice(134,137),
    },
    "Dark Citadel": {
        "animFrames": [0],
        "animSpeed": 60,  //?
        "animColors": [COLOR.magenta, COLOR.magenta_bright],
        "animSprites": sprites.monster.slice(138,139),
    },
    "Magic Castle": {
        "animFrames": [0],
        "animSpeed": 30,  //?
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSprites": sprites.monster.slice(139,140),
    },
    "Shadow Wood": {
        "animFrames": [0],
        "animSpeed": 27,  //?
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSprites": sprites.monster.slice(140,141),
    },
    "Magic Wood": {
        "animFrames": [0],
        "animSpeed": 21,  //?
        "animColors": [COLOR.green, COLOR.green_bright, COLOR.yellow, COLOR.yellow_bright],
        "animSprites": sprites.monster.slice(141,142),
    },
    "Wall": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.red_bright],
        "animSprites": sprites.monster.slice(142,143),
        "colorBackground": COLOR.yellow_bright,  // ultra special case
    },

    // Wizard Mods

    "Wizard Sword": {
        "animFrames": [0,1,2,1],
        "animSpeed": 33,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(8,11),
    },
    "Wizard Knife": {
        "animFrames": [0,1,2,1],
        "animSpeed": 28,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(11,14),
    },
    "Wizard Fly": {
        "animFrames": [0,1,2,1],
        "animSpeed": 29,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(16,19),
    },
    "Wizard Bow": {
        "animFrames": [0,1,2,3,1],
        "animSpeed": 29,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(19,23),
    },
    "Wizard Armor": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(14,15),
    },
    "Wizard Shield": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(15,16),
    },

    // Wizards

    "Wizard JULIAN": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(0,1),
    },
    "Wizard GANDALF": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(1,2),
    },
    "Wizard GREATFOGEY": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(2,3),
    },
    "Wizard DYERARTI": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(3,4),
    },
    "Wizard GOWIN": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(4,5),
    },
    "Wizard MERLIN": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(5,6),
    },
    "Wizard ILIAN RANE": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(6,7),
    },
    "Wizard ASIMONO ZARK": {
        "animFrames": [0],
        "animSpeed": 300,  //?
        "animColors": [COLOR.white],
        "animSprites": sprites.wizard.slice(7,8),
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

    sprite_and_color(frame) {
        const sprite = this.template.animSprites[this.template.animFrames[this._unit_frame(frame)]]
        const color  = this.template.animColors[this._animation_frame(frame) % this.template.animColors.length]
        return [sprite, color]
    }

    sprite_and_color_corpse() {
        //if (frame<0 && this.template.corpseFrame) {
        return [this.template.corpseFrame || sprites.monster[142], this.template.animColors[0]]  // currently 142 is a placeholder error wall .. I want to create my own error graphic
    }

    color_background() {
        return this.template.colorBackground //|| COLOR.black
    }

}

export const gfx_units = Object.fromEntries(Object.entries(unit_gfx_data)
    .map(
      ([k, v]) => [k, new GfxUnit(v)]
    )
)