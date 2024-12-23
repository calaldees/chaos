import { loadImages } from './image_decode.js'

import { sprite_data } from '../data/sprite_data.js'

export const sprites = {
    wizard: [...loadImages(sprite_data.wizards), ...loadImages(sprite_data.wizards_modified)],
    monster: [...loadImages(sprite_data.monsters)],
    cursor: [...loadImages(sprite_data.cursors), ...loadImages(sprite_data.s_cursor)],
    animation: {
        "twirl": [...loadImages(sprite_data.twirlsprite)],
        "attack_effect": [...loadImages(sprite_data.attack_effect_sprites)],
        "dragon_breath": [...loadImages(sprite_data.anim_dragon_breath)],
        "explosion": [...loadImages(sprite_data.explosionsprite)],
        "woop": [...loadImages(sprite_data.woop)],
    },
}
