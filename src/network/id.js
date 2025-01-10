import {range, assertEquals} from '../core.js'

const CHARS = "abcdefghijklmnopqrstuvwxyz1234567890"


export function generateStringId(num_chars=4) {
    return [...range(num_chars)].map(()=>CHARS[Math.floor(Math.random()*CHARS.length)]).join("")
}
assertEquals([
    [generateStringId().length, 4]
])


const KEY_ID = 'id'
export function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    const query_string_id = urlParams.get('id')
    if (query_string_id) {return query_string_id}

    let id = window.localStorage.getItem(KEY_ID)
    if (!id) {
        id = generateStringId()
        window.localStorage.setItem(KEY_ID, id)
    }
    return id
}

export function clearId() {
    // just for development. Id is meant to be constant and identify a device.
    window.localStorage.removeItem(KEY_ID)
}