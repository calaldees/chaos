import { sound_data } from '../data/sound_data.js'

export const sounds = Object.fromEntries(Object.entries(sound_data).map(
    ([key, sound_hex_data]) => [key, renderSound(sound_hex_data)]
))

function renderSound(sound_hex_data) {
    // TODO: see README and disassembly
}

export function playSound(audioContext, name) {

}