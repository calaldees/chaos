import { hasAllProperties } from "../core.js"


export class DialogJoinOrCreate {
    constructor(action_handlers, element_id="dialogJoinOrCreate") {
        const dialog = document.getElementById(element_id)
        if (!hasAllProperties(action_handlers, ['join', 'create'])) {throw 'action_handlers'}
        dialog.addEventListener("close", (e) => {
            const action = e.target.returnValue
            action_handlers[action](this.channel, this.name)
        })
        dialog.querySelector("button[action='create']").addEventListener("click", (e)=>{
            e.preventDefault()
            dialog.close("create")
        })
        dialog.querySelector("button[action='join']").addEventListener("click", (e)=>{
            e.preventDefault()
            if (!this.channel || !this.name) {
                console.warn('join', 'requires channel and name')
                return
            }
            dialog.close("join")
        })
        this.dialogJoinOrCreate = dialog
        this.dialogJoinOrCreate.showModal()
    }
    get name() {return this.dialogJoinOrCreate.querySelector("input[name='name']").value}
    get channel() {return this.dialogJoinOrCreate.querySelector("input[name='channel']").value}
}