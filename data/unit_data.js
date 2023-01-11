// https://github.com/lewster32/archaos/blob/main/assets/data/classicunits.json

export const unit_data = {
    "King Cobra": {
        "name": "King Cobra",
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
    },
    "Bat": {
        "name": "Bat",
        "attackType": "bit",
        "properties": {
            "mov": 5,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 4,
            "res": 9
        },
        "status": ["flying"],
    },
    "Gooey Blob": {
        "name": "Gooey Blob",
        "attackType": "engulfed",
        "properties": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 3,
            "mnv": 0,
            "res": 0
        },
        "status": ["spread", "engulf", "noCorpse"],
    },
    "Dire Wolf": {
        "name": "Dire Wolf",
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
    },
    "Spectre": {
        "name": "Spectre",
        "attackType": "slashed",
        "properties": {
            "mov": 1,
            "com": 4,
            "rcm": 0,
            "rng": 0,
            "def": 2,
            "mnv": 4,
            "res": 6
        },
        "status": ["undead", "trans", "noCorpse"],
    },
    "Goblin": {
        "name": "Goblin",
        "properties": {
            "mov": 1,
            "com": 2,
            "rcm": 0,
            "rng": 0,
            "def": 4,
            "mnv": 4,
            "res": 4
        },
        "status": [],
    },
    "Crocodile": {
        "name": "Crocodile",
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
    },
    "Green Dragon": {
        "name": "Green Dragon",
        "attackType": "attacked",
        "rangedType": "burned",
        "projectileType": "dragonfire",
        "properties": {
            "mov": 3,
            "com": 5,
            "rcm": 4,
            "rng": 6,
            "def": 8,
            "mnv": 4,
            "res": 4
        },
        "status": ["flying"],
    },
    "Magic Fire": {
        "name": "Magic Fire",
        "attackType": "burned",
        "properties": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["invuln", "spread", "trans", "noCorpse"],
    },

    "Faun": {
        "name": "Faun",
        "attackType": "stabbed",
        "properties": {
            "mov": 1,
            "com": 3,
            "rcm": 0,
            "rng": 0,
            "def": 2,
            "mnv": 8,
            "res": 7
        },
        "status": [],
    },
    "Vampire": {
        "name": "Vampire",
        "attackType": "savaged",
        "properties": {
            "mov": 4,
            "com": 6,
            "rcm": 0,
            "rng": 0,
            "def": 8,
            "mnv": 5,
            "res": 6
        },
        "status": ["undead", "trans", "flying", "noCorpse"],
    },
    "Lion": {
        "name": "Lion",
        "attackType": "mauled",
        "properties": {
            "mov": 4,
            "com": 6,
            "rcm": 0,
            "rng": 0,
            "def": 4,
            "mnv": 3,
            "res": 8
        },
        "status": [],
    },
    "Gryphon": {
        "name": "Gryphon",
        "attackType": "clawed",
        "properties": {
            "mov": 5,
            "com": 3,
            "rcm": 0,
            "rng": 0,
            "def": 5,
            "mnv": 6,
            "res": 5
        },
        "status": ["mount", "flying"],
    },
    "Elf": {
        "name": "Elf",
        "attackType": "hit",
        "rangedType": "shot",
        "projectileType": "arrow",
        "properties": {
            "mov": 1,
            "com": 1,
            "rcm": 2,
            "rng": 6,
            "def": 2,
            "mnv": 7,
            "res": 5
        },
        "status": [],
    },





    "Pegasus": {
        "name": "Pegasus",
        "attackType": "kicked",
        "properties": {
            "mov": 5,
            "com": 2,
            "rcm": 0,
            "rng": 0,
            "def": 4,
            "mnv": 7,
            "res": 6
        },
        "status": ["mount", "flying"],
    },


    "Manticore": {
        "name": "Manticore",
        "attackType": "bit",
        "rangedType": "stung",
        "projectileType": "arrow",
        "properties": {
            "mov": 5,
            "com": 3,
            "rcm": 1,
            "rng": 3,
            "def": 6,
            "mnv": 8,
            "res": 6
        },
        "status": ["mount", "flying"],
    },


    "Ghost": {
        "name": "Ghost",
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
    },
}