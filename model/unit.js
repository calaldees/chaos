export class Unit {
    constructor(template, owner) {
        this.template = template
        this.owner = owner
        this.status = new Set()
    }

}