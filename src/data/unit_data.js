// https://zxnet.co.uk/spectrum/chaos/asm/E440.html
// https://github.com/lewster32/archaos/blob/main/assets/data/classicunits.json

// com Combat=0,
// rcm Ranged combat=0,
// rng Range=0,
// def Defence=0,
// mov Movement allowance=0,
// mnv Manoeuvre rating=0,
// res Magic resistance=0,
// Casting chance=0,
// Chaos/Law=0,
// Animation delay=1

export const unit_data = {
    "King Cobra": {
        "name": "King Cobra",
        "attackType": "struck",
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
        "stats": {
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
    "Horse": {
        "name": "Horse",
        "attackType": "kicked",
        "stats": {
            "mov": 4,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 3,
            "mnv": 1,
            "res": 8
        },
        "status": ["mount"],
    },
    "Orc": {
        "name": "Orc",
        "stats": {
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
    "Red Dragon": {
        "name": "Red Dragon",
        "attackType": "attacked",
        "rangedType": "burned",
        "projectileType": "dragonfire",
        "stats": {
            "mov": 3,
            "com": 7,
            "rcm": 3,
            "rng": 5,
            "def": 9,
            "mnv": 5,
            "res": 4
        },
        "status": ["flying"],
    },
    "Troll": {
        "name": "Troll",
        "attackType": "??ed",
        "stats": {
            "mov": 1,
            "com": 4,
            "rcm": 0,
            "rng": 0,
            "def": 8,
            "mnv": 1,
            "res": 4
        },
        "status": [],
    },
    "Unicorn": {
        "name": "Unicorn",
        "attackType": "kicked",
        "stats": {
            "mov": 4,
            "com": 5,
            "rcm": 0,
            "rng": 0,
            "def": 4,
            "mnv": 7,
            "res": 9
        },
        "status": ["mount"],
    },
    "Pegasus": {
        "name": "Pegasus",
        "attackType": "kicked",
        "stats": {
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
        "stats": {
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
        "stats": {
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

    "Wraith": {
        "name": "Wraith",
        "attackType": "stabbed",
        "stats": {
            "mov": 2,
            "com": 5,
            "rcm": 0,
            "rng": 0,
            "def": 5,
            "mnv": 5,
            "res": 4
        },
        "status": ["undead", "noCorpse"],
    },
    "Bear": {
        "name": "Bear",
        "attackType": "mauled",
        "stats": {
            "mov": 2,
            "com": 6,
            "rcm": 0,
            "rng": 0,
            "def": 7,
            "mnv": 2,
            "res": 6
        },
        "status": [],
    },
    "Gorilla": {
        "name": "Gorilla",
        "attackType": "pounded",
        "stats": {
            "mov": 1,
            "com": 6,
            "rcm": 0,
            "rng": 0,
            "def": 5,
            "mnv": 2,
            "res": 4
        },
        "status": [],
    },
    "Skeleton": {
        "name": "Skeleton",
        "attackType": "slashed",
        "stats": {
            "mov": 1,
            "com": 3,
            "rcm": 0,
            "rng": 0,
            "def": 2,
            "mnv": 4,
            "res": 3
        },
        "status": ["undead", "noCorpse"],
    },
    "Ogre": {
        "name": "Ogre",
        "attackType": "clubbed",
        "stats": {
            "mov": 1,
            "com": 4,
            "rcm": 0,
            "rng": 0,
            "def": 7,
            "mnv": 6,
            "res": 3
        },
        "status": [],
    },
    "Zombie": {
        "name": "Zombie",
        "attackType": "bit",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 2
        },
        "status": ["undead", "noCorpse"],
    },
    "Harpy": {
        "name": "Harpy",
        "attackType": "clawed",
        "stats": {
            "mov": 5,
            "com": 4,
            "rcm": 0,
            "rng": 0,
            "def": 2,
            "mnv": 5,
            "res": 8
        },
        "status": ["flying"],
    },
    "Eagle": {
        "name": "Eagle",
        "attackType": "clawed",
        "stats": {
            "mov": 6,
            "com": 3,
            "rcm": 0,
            "rng": 0,
            "def": 3,
            "mnv": 2,
            "res": 8
        },
        "status": ["flying"],
    },
    "Hydra": {
        "name": "Hydra",
        "attackType": "struck",
        "stats": {
            "mov": 1,
            "com": 7,
            "rcm": 0,
            "rng": 0,
            "def": 8,
            "mnv": 6,
            "res": 4
        },
        "status": [],
    },
    "Giant Rat": {
        "name": "Giant Rat",
        "attackType": "bit",
        "stats": {
            "mov": 3,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 2,
            "res": 8
        },
        "status": [],
    },
    "Centaur": {
        "name": "Centaur",
        "attackType": "kicked",
        "rangedType": "shot",
        "projectileType": "arrow",
        "stats": {
            "mov": 4,
            "com": 1,
            "rcm": 2,
            "rng": 4,
            "def": 3,
            "mnv": 5,
            "res": 5
        },
        "status": ["mount"],
    },
    "Giant": {
        "name": "Giant",
        "attackType": "crushed",
        "stats": {
            "mov": 2,
            "com": 9,
            "rcm": 0,
            "rng": 0,
            "def": 7,
            "mnv": 5,
            "res": 6
        },
        "status": [],
    },
    "Golden Dragon": {
        "name": "Golden Dragon",
        "attackType": "attacked",
        "rangedType": "burned",
        "projectileType": "dragonfire",
        "stats": {
            "mov": 3,
            "com": 7,
            "rcm": 5,
            "rng": 4,
            "def": 9,
            "mnv": 5,
            "res": 4
        },
        "status": ["flying"],
    },
    "Dark Citadel": {
        "name": "Dark Citadel",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["mount", "invuln", "expires", "struct", "noCorpse"],
    },
    "Magic Castle": {
        "name": "Magic Castle",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["mount", "invuln", "expires", "struct", "noCorpse"],
    },
    "Shadow Wood": {
        "name": "Shadow Wood",
        "attackType": "attacked",
        "stats": {
            "mov": 0,
            "com": 2,
            "rcm": 0,
            "rng": 0,
            "def": 4,
            "mnv": 0,
            "res": 9
        },
        "status": ["tree", "noCorpse"],
    },
    "Magic Wood": {
        "name": "Magic Wood",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 5,
            "mnv": 0,
            "res": 9
        },
        "status": ["mountAny", "tree", "expires", "expiresGivesSpell", "noCorpse"],
    },
    "Wall": {
        "name": "Wall",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["invuln", "struct", "noCorpse"],
    },

    "Wizard Sword": {
        "name": "Wizard Sword",
        "stats": {
            "mov": 0,
            "com": 3,  // this will be added to wizard I assume
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod"],
    },
    "Wizard Knife": {
        "name": "Wizard Knife",
        "stats": {
            "mov": 0,
            "com": 2,  // this will be added to wizard I assume
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod"],
    },
    "Wizard Fly": {
        "name": "Wizard Fly",
        "stats": {
            "mov": 5,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod", "flying"],
    },
    "Wizard Bow": {
        "name": "Wizard Bow",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 5,
            "def": 0,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod"],
    },
    "Wizard Armour": {
        "name": "Wizard Armour",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 5,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod"],
    },
    "Wizard Shield": {
        "name": "Wizard Shield",
        "stats": {
            "mov": 0,
            "com": 0,
            "rcm": 0,
            "rng": 0,
            "def": 3,
            "mnv": 0,
            "res": 0
        },
        "status": ["wizardMod"],
    },

    // https://zxnet.co.uk/spectrum/chaos/asm/EA39.html
    "Wizard JULIAN": {
        "name": "Wizard JULIAN",
        "stats": {
            "mov": 1,
            "com": 1, // +rnd(0,9)/2  -> getRandomInt(9)>>1 01=0 23=1 45=2 67=3 89=4
            "rcm": 0,
            "rng": 0,
            "def": 1, // +rnd(0,9)/2
            "mnv": 3, // +rnd(0,9)/2
            "res": 6, // +rnd(0,9)/4  -> getRandomInt(9)>>2 0123=0 4567=1 89=2
            // ability 1  //
            "spells": 11,  //min(rad(0,9)/2, 9)
        },
    },
    "Wizard GANDALF": {
        "name": "Wizard GANDALF",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 0
            "spells": 11,
        },

    },
    "Wizard GREATFOGEY": {
        "name": "Wizard GREATFOGEY",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 0
            "spells": 11,
        },

    },
    "Wizard DYERARTI": {
        "name": "Wizard DYERARTI",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 1
            "spells": 11,
        },

    },
    "Wizard GOWIN": {
        "name": "Wizard GOWIN",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 5,
            "res": 6,
            // ability 0
            "spells": 11,
        },
    },
    "Wizard MERLIN": {
        "name": "Wizard MERLIN",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 0
            "spells": 11,
        },
    },
    "Wizard ILIAN RANE": {
        "name": "Wizard ILIAN RANE",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 0
            "spells": 11,
        },
    },
    "Wizard ASIMONO ZARK": {
        // Combat=3, Ranged combat=0, Range=0, Defence=2, Movement allowance=1, Manoeuvre rating=6, Magic resistance=0, Spells=0, Ability=0, Animation delay=30
        "name": "Wizard ASIMONO ZARK",
        "stats": {
            "mov": 1,
            "com": 1,
            "rcm": 0,
            "rng": 0,
            "def": 1,
            "mnv": 3,
            "res": 6,
            // ability 1
            "spells": 11,
        },
    },



}