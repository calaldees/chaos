import { enumerate } from '../core.js'
import { sound_data } from '../data/sound_data.js'
import { hexToBytes, cleanHexString } from '../gfx/image_decode.js'

// The Spectrum beeper is a 1-bit speaker: every `OUT ($FE),A` after the
// `XOR $30` flips the cone between two positions. The sound data therefore
// does not describe a waveform - it describes a sequence of *edges*, and the
// gap between consecutive edges is a delay measured in Z80 T-states. Playing
// that back produces a square wave whose pitch is set by the delay length.
//
// The pipeline is two stages:
//   1. chaosSoundDelays  - run the Z80 loop structure to emit a flat list of
//                          per-edge delays (in T-states).
//   2. delaysToSamples   - resample that edge list into PCM (skoolkit's algo).

const CLOCK_SPEED = 3_500_000   // Z80 clock, ~3.5 MHz
const SAMPLE_RATE = 44_100      // output PCM rate; must match the AudioBuffer
const EDGE_OVERHEAD = 92        // ~T-states for the PUSH/POP/LD/XOR/OUT
                                // instructions around each edge. The delay
                                // routine numbers are exact; this is the one
                                // fudge factor - tune by ear vs the ref MP3s.

export const sounds = Object.fromEntries(Object.entries(sound_data).map(
    ([key, sound_hex_data]) => [key, renderSound([...hexToBytes(cleanHexString(sound_hex_data))])]
))


function renderSound(data) {
    return delaysToSamples([...chaosSoundDelays(data)])
}

// Stage 1: run the Z80 loop structure and yield one delay (in T-states) per
// speaker edge.
//
//   C2E8 	DEFB $3F 	Outer loop counter.  -> data[0]
//   C2E9 	DEFB $04 	Middle loop counter. -> data[1]
//   C2EA 	DEFB ...  	Delay counters.      -> data[2..6]  (mutated live)
//   C2EE 	DEFB ...  	Values to add.       -> data[6..10]
//
// The inner loop is always 4 iterations (`LD B,$04`). Once per *outer* pass
// the four delay counters have their add-values added back (8-bit wrap),
// which produces the pitch sweep.
function* chaosSoundDelays(data) {
    const outer_loop_counter = data[0]
    const middle_loop_counter = data[1]
    const delay_counters = data.slice(2, 6)      // mutable live counters
    const delay_counters_add = data.slice(6, 10)

    for (let o = 0; o < outer_loop_counter; o++) {
        for (let m = 0; m < middle_loop_counter; m++) {
            for (let i = 0; i < 4; i++) {
                // A DJNZ delay byte of 0 means 256 loops (B is decremented
                // before the zero test), not 0.
                const b = delay_counters[i] === 0 ? 256 : delay_counters[i]
                // delay routine: 17 (call) + (13*(b-1))+8 (loop) + 10 (ret)
                yield 17 + (13 * (b - 1)) + 8 + 10 + EDGE_OVERHEAD
            }
        }
        for (let i = 0; i < 4; i++) {
            delay_counters[i] = (delay_counters[i] + delay_counters_add[i]) & 0xFF
        }
    }

    // http://z80-heaven.wikidot.com/control-structures
    // DJNZ does these things (in this order):
    // Decreases B
    // Checks if B is zero
    //    If it is, continue on in code
    //    Else, jump to specified label
}

// Stage 2: skoolkit's `_delays_to_samples`, ported to JS.
// https://github.com/skoolkid/skoolkit/blob/7d578b68/skoolkit/audio.py#L138
// Walks the edge list in T-state time, emitting one sample every
// `samplePeriod` T-states and flipping level each time an edge is crossed.
function delaysToSamples(delays, sampleRate = SAMPLE_RATE, amp = 0.4) {
    if (delays.length === 0) return []
    const samplePeriod = CLOCK_SPEED / sampleRate
    const out = []
    let level = amp
    let t = 0
    let i = 0
    let edgeT = delays[0]
    while (i < delays.length) {
        while (t >= edgeT) {
            if (++i >= delays.length) break
            edgeT += delays[i]
            level = -level
        }
        if (i >= delays.length) break
        out.push(level)
        t += samplePeriod
    }
    return out
}


// https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
// The sampleRate here MUST match SAMPLE_RATE used to render the float stream,
// otherwise the browser resamples and the pitch shifts.
function floatSteam_to_audioBuffer(audioCtx, floatSteam, sampleRate=SAMPLE_RATE) {
    const audioBuffer = audioCtx.createBuffer(1, floatSteam.length, sampleRate)
    const b = audioBuffer.getChannelData(0)
    for (let [i, d] of enumerate(floatSteam)) {
       b[i] = d
    }
    return audioBuffer
}

function playAudioBuffer(audioCtx, audioBuffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioCtx.destination)
    source.start()
    return source
}

// Browsers start an AudioContext in a "suspended" state until a user gesture
// resumes it. Create it lazily and resume on the first click/keypress.
let _audioContext = null
export function getAudioContext() {
    if (!_audioContext) {
        _audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const resume = () => {
            if (_audioContext.state === 'suspended') _audioContext.resume()
        }
        window.addEventListener('click', resume)
        window.addEventListener('keydown', resume)
    }
    return _audioContext
}

export function playSound(name, audioContext=getAudioContext()) {
    if (_audioContext && _audioContext.state === 'suspended') _audioContext.resume()
    console.log("playSound", name)
    playAudioBuffer(audioContext, floatSteam_to_audioBuffer(audioContext, sounds[name]))
}

export function drawAudioFloatStream(c, floatStream, yScaleFactor=50, xScale=4) {
    c.strokeStyle = 'cyan'
    c.fillStyle = 'magenta'
    c.lineWidth = 1
    c.beginPath()
    let [i, v] = [0,0]
    for ([i, v] of enumerate(floatStream)) {
        if (i%xScale) {continue}
        c.lineTo(i/xScale, Math.min(Math.max(v*yScaleFactor, -yScaleFactor),yScaleFactor))
    }
    c.lineTo(i, 0)
    c.lineTo(0, 0)
    c.fill()
}