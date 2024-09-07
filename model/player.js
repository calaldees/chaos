export class Player {
    constructor(name, unit) {
        if (!name || !unit) {throw Error()}
        this.name = name
        this.unit = unit
        this.units = []
    }
}