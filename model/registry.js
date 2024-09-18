export class Registry {
    constructor() {
        this.units = []
        this.players = {}
    }

    getPlayer(unit) {
        return this.players[unit.player_name]
    }

}