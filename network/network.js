/*

OnBoot - gen random id - persist this in offline storage
Id is alphanumeric base (lowercase+numbers? base 36? always 4 digets - gen number between min and max)

onConnect - hello with id -
    get state with id in -
    if no response "we are the server!"
      - if game in offline_state - send over network

    send state update
*/

window.addEventListener("hashchange", (event)=>{})
window.location.hash.replace('#','')

const urlParams = new URLSearchParams(window.location.search);
const websocket_url = urlParams.get('websocket_url') || `${window.location.protocol.startsWith("https")?"wss":"ws"}://${window.location.host}/ws`

const socket = new WebSocket(websocket_url)
socket.addEventListener("open", (event) => {
    //socket.send("Hello Server!")
})
socket.addEventListener("message", (msg)=>{
    const data = JSON.parse(msg.data)
    console.log("websocket", data)
})
socket.addEventListener("close", (event) => {
    console.log("closed")
})



    // if (socket.readyState!=WebSocket.OPEN) {return}
    // socket.send(JSON.stringify({}))
