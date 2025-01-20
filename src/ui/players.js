import { enumerate, hasAllProperties } from "../core.js"
import { COLOR, shiftImage } from '../gfx/color.js'
import { PLAYER_START_INDEX } from '../model/game.js'
import { i_to_xy } from '../gfx/gfx_dispatch.js'
import { gfx_units } from '../gfx/units.js'
import { drawFont, FONT_WIDTH, FONT_HEIGHT } from '../gfx/text.js'


class ALIGN {
    static LEFT = 0
    static RIGHT = 1
    static CENTRE = 2
}

const PLAYER_START_INDEX_LABEL_SHIFT = {
    0: [],
    1: [
        [PLAYER_START_INDEX[1][0], +1, ALIGN.CENTRE],
    ],
    2: [
        [PLAYER_START_INDEX[2][0], +1, ALIGN.LEFT],
        [PLAYER_START_INDEX[2][1], -1, ALIGN.RIGHT],
    ],
    3: [
        [PLAYER_START_INDEX[3][0], +1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[3][1], -1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[3][2], -1, ALIGN.CENTRE],
    ],
    4: [
        [PLAYER_START_INDEX[4][0], +1, ALIGN.LEFT],
        [PLAYER_START_INDEX[4][1], +1, ALIGN.RIGHT],
        [PLAYER_START_INDEX[4][2], -1, ALIGN.LEFT],
        [PLAYER_START_INDEX[4][3], -1, ALIGN.RIGHT],
    ],
    5: [
        [PLAYER_START_INDEX[5][0], +1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[5][1], +1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[5][2], -1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[5][3], -1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[5][4], +1, ALIGN.CENTRE],
    ],
    6: [
        [PLAYER_START_INDEX[6][0], +1, ALIGN.LEFT],
        [PLAYER_START_INDEX[6][1], -1, ALIGN.RIGHT],
        [PLAYER_START_INDEX[6][2], -1, ALIGN.LEFT],
        [PLAYER_START_INDEX[6][3], +1, ALIGN.RIGHT],
        [PLAYER_START_INDEX[6][4], +1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[6][5], -1, ALIGN.CENTRE],
    ],
    7: [
        [PLAYER_START_INDEX[7][0], +1, ALIGN.LEFT],
        [PLAYER_START_INDEX[7][1], -1, ALIGN.RIGHT],
        [PLAYER_START_INDEX[7][2], -1, ALIGN.LEFT],
        [PLAYER_START_INDEX[7][3], +1, ALIGN.RIGHT],
        [PLAYER_START_INDEX[7][4], +1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[7][5], -1, ALIGN.CENTRE],
        [PLAYER_START_INDEX[7][6], -1, ALIGN.CENTRE],
    ],
    8: [
    ],
}

export class UIPlayers {
    // This UI is a special case
    // It attaches to the map canvas as a write-only-display for joined players
    constructor(canvas) {
        console.assert(canvas.constructor.name == 'HTMLCanvasElement')
        this.canvas = canvas
        this.c = this.canvas.getContext('2d')
        this._players = []
    }

    get players() {return this._players}
    set players(players) {
        this._players = players
        const PLAYER_REQUIRED_KEYS = ['name', 'unit_type', 'color']
        this._players.forEach((player)=>{
            if (!hasAllProperties(player, PLAYER_REQUIRED_KEYS)) {throw `player must have ${PLAYER_REQUIRED_KEYS}, obj_properties:${Object.getOwnPropertyNames(player)}`}
        })
        this.draw()
    }

    clear() {
        this.c.clearRect(...i_to_xy(0), ...i_to_xy(149))
    }

    draw() {
        this.clear()
        for (let [j, player] of enumerate(this.players)) {
            const [i, row_shift, align] = PLAYER_START_INDEX_LABEL_SHIFT[this.players.length][j]
            this.drawUnitType(i, player.unit_type, player.color)
            this.drawFontForIndex(player.name, COLOR.white, i, row_shift, align)
            if (player.ready == 'yes') {
                this.drawFontForIndex('Ready', COLOR.yellow, i, -row_shift, ALIGN.CENTRE)
            }
        }
    }
    drawUnitType(i, unit_type, color) {
        const [sprite, _] = gfx_units[unit_type].sprite_and_color(0)
        this.c.drawImage(shiftImage(sprite, color), ...i_to_xy(i))
    }
    drawFontForIndex = (text, color=COLOR.white, i, row_shift=0, align=ALIGN.LEFT) => {
        let [x,y] = i_to_xy(i)
        y += FONT_HEIGHT * row_shift
        if      (align == ALIGN.LEFT)   {x -= 0}
        else if (align == ALIGN.RIGHT)  {x -= (FONT_WIDTH*text.length)-16}
        else if (align == ALIGN.CENTRE) {x -= Math.floor(FONT_WIDTH*((text.length/2)-1))}
        else                            {throw `invalid alignment`}
        drawFont(this.c, text, x, y, color)
    }

}