import { hasAllProperties } from "../core.js"


export class DialogJoinOrCreate {
    constructor(action_handlers, element_id="dialogJoinOrCreate") {
        const dialog = document.getElementById(element_id)
        if (!hasAllProperties(action_handlers, ['join', 'create'])) {throw 'action_handlers'}
        dialog.addEventListener("close", (e) => {
            const action = e.target.returnValue
            action_handlers[action](this.name, this.channel)
        })
        dialog.querySelector("button[action='create']").addEventListener("click", (e)=>{
            e.preventDefault()
            dialog.close("create")
        })
        dialog.querySelector("button[action='join']").addEventListener("click", (e)=>{
            e.preventDefault()
            if (!this.name || !this.channel) {
                console.warn('join', 'requires name and channel')
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