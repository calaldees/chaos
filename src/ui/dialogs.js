import {getId} from '../network/id.js'


// Dialog
export const dialogJoinOrCreate = document.getElementById("dialogJoinOrCreate")
dialogJoinOrCreate.addEventListener("close", (e) => {
    const action = e.target.returnValue
    const name = dialogJoinOrCreate.querySelector("input[name='name']").value
    const channel = dialogJoinOrCreate.querySelector("input[name='channel']").value
    //const _channel = action == "join" ?
    console.log(action, name, channel)
})
dialogJoinOrCreate.querySelector("button[action='create']").addEventListener("click", (e)=>{
    e.preventDefault()
    dialogJoinOrCreate.close("create")
})
dialogJoinOrCreate.querySelector("button[action='join']").addEventListener("click", (e)=>{
    e.preventDefault()
    dialogJoinOrCreate.close("join")
})