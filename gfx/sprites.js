import { loadImages } from './image_decode.js'

import { sprite_data } from '../data/sprite_data.js'

export const wizard_sprites = [...loadImages(sprite_data.wizards)]
export const monster_sprites = [...loadImages(sprite_data.monsters)]

