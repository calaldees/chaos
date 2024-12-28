import { enumerate, hasAllProperties } from "../core.js"
import { COLOR, shiftImage } from '../gfx/color.js'
import { INDEX_START } from '../model/game.js'
import { i_to_xy } from '../gfx/gfx_dispatch.js'
import { gfx_units } from '../gfx/units.js'
import { drawFont, FONT_WIDTH, FONT_HEIGHT } from '../gfx/text.js'


class ALIGN {
    static LEFT = 0
    static RIGHT = 1
    static CENTRE = 2
}

const INDEX_LABEL_SHIFT = [
    [INDEX_START[0], +1, ALIGN.LEFT],
    [INDEX_START[1], -1, ALIGN.RIGHT],
    [INDEX_START[2], -1, ALIGN.LEFT],
    [INDEX_START[3], +1, ALIGN.RIGHT],
    [INDEX_START[4], +1, ALIGN.CENTRE],
    [INDEX_START[5], -1, ALIGN.CENTRE],
    // player 7?
    // player 8?
]

export class UIJoin {
    constructor(canvas) {
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
            const [i, row_shift, align] = INDEX_LABEL_SHIFT[j]
            this.drawUnitType(i, player.unit_type, player.color)
            this.drawFontForIndex(player.name, COLOR.white, i, row_shift, align)
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