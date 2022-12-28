import { monster_sprites } from "./sprites.js"
import { COLOR } from './color.js'

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
        "animSpeed": 4,
        "corpseFrame": monster_sprites[8],
        "animSprites": monster_sprites.slice(1,4),
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
        "animSpeed": 4,
        "animSprites": monster_sprites.slice(79,84),
    },
}