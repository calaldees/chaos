export class Unit {
    constructor(template, owner) {
        this.template = template
        this.owner = owner
        this.status = new Set()
        this.positions = []
        this.moves_remaining = 0
        this.animColorsOverride = []
    }
    get pos() {
        return this.positions[0]
    }
    setPos(i) {
        this.positions.unshift(i)
    }
    get flip() {
        if (this.positions.length<2) {return 0}
        return (this.positions[0] > this.positions[1]) ? 1 : 0  // not correct, but a close hack
    }
}