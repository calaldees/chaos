import { monster_sprites } from "./sprites.js"
import { COLOR } from '../gfx/color.js'

export const units = {
    "King Cobra": {
        "attackType": "struck",
        "properties": {
            "mov": 1,
            "com": 4,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 1,
            "res": 6
        },
        "status": [],
        "name": "King Cobra",
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green_bright],
        "animSpeed": 24,
        "corpseFrame": monster_sprites[8],
        "animSprites": monster_sprites.slice(1,4),
    },
    "Dire Wolf": {
        "attackType": "savaged",
        "properties": {
            "mov": 3,
            "com": 3,
            "rcm": 0,
            "rng": 0,
            "def": 2,
            "mnv": 2,
            "res": 7
        },
        "status": [],
        "name": "Dire Wolf",
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.white],
        "animSpeed": 30,  //?
        "corpseFrame": monster_sprites[17],
        "animSprites": monster_sprites.slice(13,16),
    },
    "Crocodile": {
        "attackType": "bit",
        "properties": {
            "mov": 1,
            "com": 5,
            "rcm": 0,
            "rng": 0,
            "def": 6,
            "mnv": 2,
            "res": 2
        },
        "status": [],
        "name": "Crocodile",
        "animFrames": [0, 1, 2, 1],
        "animColors": [COLOR.green],
        "animSpeed": 30,  //?
        "corpseFrame": monster_sprites[28],
        "animSprites": monster_sprites.slice(23,26),
    },


    "Ghost": {
        "attackType": "attacked",
        "properties": {
            "mov": 2,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 3,
            "mnv": 6,
            "res": 9
        },
        "status": ["undead", "trans", "flying", "noCorpse"],
        "name": "Ghost",
        "animFrames": [0, 1, 2, 3],
        "animColors": [COLOR.cyan, COLOR.cyan_bright],
        "animSpeed": 32,
        "animSprites": monster_sprites.slice(79,84),
    },
}