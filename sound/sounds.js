import { range, enumerate } from '../core.js'
import { sound_data } from '../data/sound_data.js'
import { hexToBytes, cleanHexString } from '../gfx/image_decode.js'

export const sounds = Object.fromEntries(Object.entries(sound_data).map(
    ([key, sound_hex_data]) => [key, renderSound([...hexToBytes(cleanHexString(sound_hex_data))])]
))


function renderSound(data) {
    return [...timecodes_to_floatStream(chaosSoundDelayData_to_timecodes(data))]
}

function* chaosSoundDelayData_to_timecodes(data) {
    //C2E8 	DEFB $3F 	Outer loop counter.
    //C2E9 	DEFB $04 	Middle loop counter.
    //C2EA 	DEFB $FD,$FD,$C6,$93 	Delay counters.
    //C2EE 	DEFB $04,$04,$E2,$B0 	Values to add to delay.

    const outer_loop_counter = data[0]
    const middle_loop_counter = data[1]
    const delay_counters = data.slice(2,6)
    const delay_counters_add = data.slice(6,10)

    // Each Z80 assembly instruction takes time - TStates
    // The Z80 reference manual documents the time for each instruction
    // http://z80-heaven.wikidot.com/instructions-set:add
    let t = 0
    for (let l1 of range(outer_loop_counter)) {
        t += 0
        for (let l2 of range(middle_loop_counter)) {
            t += 17
            for (let d of delay_counters) {
                // calling routine takes 17 T-states, loop for (13*(B-1))+8 T-states, and return takes 10 T-states
                t += (13*(d-1))
                yield t
                t += 8
            }
            t += 10
        }
        for (let i of enumerate(delay_counters)) {
            delay_counters[i] += delay_counters_add[i]
        }
        t += 0
    }
    


    // http://z80-heaven.wikidot.com/control-structures
    // DJNZ does these things (in this order):
    // Decreases B
    // Checks if B is zero
    //    If it is, continue on in code
    //    Else, jump to specified label
}

function* timecodes_to_floatStream(timecodes) {
    yield* timecodes_to_floatStream__mass_velocity(timecodes)
}

function* timecodes_to_floatStream__mass_velocity(timecodes, friction=0.99, gravity=0.01, force=0.05, mass=0.3) {
    let a = 0
    let vel = 0
    let last_t = 0
    for (let [i, t] of enumerate(timecodes)) {
        t = Math.floor(t/1000)  // convert processor Mhz to Khz - originally the sample was SUPER long
        //console.log(i,t)
        const up_down = i % 2 ? +1 : -1
        for (let _t = last_t ; _t<t ; _t++) {
            vel += (force * up_down)/mass  // apply force in direction of motion
            vel += -vel*gravity  // attract towards centre
            vel *= friction  // create terminal velocity
            a += vel
            if (a>1 || a<-1) {
                a = Math.max(Math.min(a, 1), -1)  // limit to range -1 to 1
                vel = 0
            }
            yield a
        }
        last_t = t
    }
    // fade to 0
    while (Math.abs(a)>0.001) {
        yield a *= 0.9
    }
}

function* timecodes_to_floatStream__linear_test(timecodes, attack=0.01, decay=0.01) {
    let a = 0
    let last_t = 0
    for (let [i, t] of enumerate(timecodes)) {
        const up_down = i % 2 ? +1 : -1
        for (let _t = last_t ; _t<t ; _t++) {
            yield a += up_down * 0.01
        }
        last_t = t
    }
}


// https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
function floatSteam_to_audioBuffer(audioCtx, floatSteam, sampleRate=11050) {
    const audioBuffer = audioCtx.createBuffer(1, floatSteam.length, sampleRate)    // 3 seconds
    const b = audioBuffer.getChannelData(0)
    for (let [i, d] of enumerate(floatSteam)) {
    //for (let i=0 ; i<b.length ; i++) {
       //b[i] = Math.random() * 2 - 1  // Random audio test
       b[i] = d
    }
    return audioBuffer
}

function playAudioBuffer(audioCtx, audioBuffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioCtx.destination)
    source.start()
}

export function playSound(audioContext, name) {
    playAudioBuffer(audioContext, floatSteam_to_audioBuffer(audioContext, sounds[name]))
}

export function drawAudioFloatStream(c, floatStream, yScaleFactor=50, xScale=1) {
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