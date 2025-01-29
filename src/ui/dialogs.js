import { hasAllProperties, h } from "../core.js"


export class DialogJoinOrCreate {
    constructor(document_body) {
        document_body = document_body || document.body
        const dialog = h('dialog',{id:"dialogJoinOrCreate"},[
            h('p',{},"Chaos"),
            h('form',{method:"dialog"},[
                h('input', {type:"text", name:"name", size:10, placeholder:"name"}),
                h('input', {type:"text", name:"channel", size:4, placeholder:"channel"}),
                h('button',{action:"join"}, 'Join'), ' or ', h('button',{action:"create"},"Create")
            ])
        ])
        document_body.appendChild(dialog)

        //if (!hasAllProperties(action_handlers, ['join', 'create'])) {throw 'action_handlers'}
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
        this.dialog = dialog
    }
    get name() {return this.dialog.querySelector("input[name='name']").value}
    get channel() {return this.dialog.querySelector("input[name='channel']").value}

    showModalPromise = ()=>{
        return new Promise((resolve, reject) => {

            // Query String params may be used to bypass the join dialog
            const urlParams = new URLSearchParams(window.location.search)
            if (urlParams.get('dialogAction')) {
                return resolve({
                    action: urlParams.get('dialogAction'),
                    channel: urlParams.get('channel'),
                    player_name: urlParams.get('player_name')
                })
            }

            // Show blocking dialog
            this.dialog.showModal()
            this.dialog.addEventListener("close", (e) => {
                resolve({
                    action: e.target.returnValue,
                    channel: this.channel,
                    player_name: this.name
                })
            })
        })
    }
}