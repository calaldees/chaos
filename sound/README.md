I don't know how they did it, but the reverse engineer masters created an mp3 of the sound effects form the binary data
I need to ask them how they did it

skoolkit is a tool to disassemble spectrum games. It has a routine for rendering audio from delays. This is similar to what I want to do.
https://github.com/skoolkid/skoolkit/blob/7d578b689a888b6dcd8ec089369c452954b8d922/skoolkit/audio.py#L138
```python
    def _delays_to_samples(self, delays, options):
        sample_delay = options[CLOCK_SPEED] / options[SAMPLE_RATE]
        samples = []
        direction = 1
        i = 0
        d = delays[0]
        t = 0
        while 1:
            while t >= d:
                i += 1
                if i >= len(delays):
                    break
                d += delays[i]
                direction *= -1
            if i >= len(delays):
                break
            if direction > 0:
                samples.append(32767)
            else:
                samples.append(32768)
            t += sample_delay
        return samples
```

http://z80-heaven.wikidot.com/the-registers-and-memory


https://zxnet.co.uk/spectrum/chaos/asm/C33A.html
C33A: sound_playback_delay_routine
Used by the routine at play_sound_effect_pointer.
calling routine takes 17 T-states, loop for (13*(B-1))+8 T-states, and return takes 10 T-states
sound_playback_delay_routine 	C33A 	DJNZ sound_playback_delay_routine 	loop to self B-1 times then return
	C33C 	RET

https://zxnet.co.uk/spectrum/chaos/asm/C2E8.html
C2E8: sound effect data
Sound effects are copied here by play_sound_effect_in_HL and the bytes read directly to save calculating offsets at the original location.
sound_effect_temp 	C2E8 	DEFB $3F 	Outer loop counter.
	C2E9 	DEFB $04 	Middle loop counter.
	C2EA 	DEFB $FD,$FD,$C6,$93 	Delay counters.
	C2EE 	DEFB $04,$04,$E2,$B0 	Values to add to delay.

https://zxnet.co.uk/spectrum/chaos/asm/C2F6.html#C2F9

sound_effect_playback 	C301 	DI 	disable interrupts
	C302 	LD HL,sound_effect_temp 	load first byte of sound effect playback data into B
	C305 	LD B,(HL)
outer_sound_loop 	C306 	PUSH BC 	preserve BC (outer loop counter)
	C307 	LD HL,$C2E9 	load second byte of sound_effect_temp data into B
	C30A 	LD B,(HL)
middle_sound_loop 	C30B 	PUSH BC 	preserve BC (middle loop counter)
	C30C 	LD B,$04 	set B to four as loop counter
	C30E 	LD HL,$C2EA 	set HL to third byte of sound_effect_temp data
inner_sound_loop 	C311 	PUSH BC 	preserve inner loop counter
	C312 	PUSH HL 	preserve HL
	C313 	LD B,(HL) 	load byte at HL into B as delay
	C314 	CALL sound_playback_delay_routine 	call sound_playback_delay_routine
	C317 	LD A,(port_FE_output_byte) 	load port_FE_output_byte into A
	C31A 	XOR $30 	XOR with 00110000 (flip bits 4 and 5)
	C31C 	LD (port_FE_output_byte),A 	write result back to port_FE_output_byte
	C31F 	OUT ($FE),A 	output value to port $FE (ULA sound and border)
	C321 	POP HL 	restore HL
	C322 	INC HL 	increment HL to point to the next byte in the data block
	C323 	POP BC 	restore inner loop counter
	C324 	DJNZ inner_sound_loop 	loop back to inner_sound_loop for 4 iterations
	C326 	POP BC 	restore middle loop counter
	C327 	DJNZ middle_sound_loop 	loop back to middle_sound_loop
	C329 	LD B,$04 	set B to four
	C32B 	EX DE,HL 	swap HL and DE (so DE = C2EE)
	C32C 	LD HL,$C2EA 	set HL to C2EA
sound_delay_addition_loop 	C32F 	LD A,(DE) 	add byte at address in HL to byte at address in DE and store result at address in HL
	C330 	ADD A,(HL)
	C331 	LD (HL),A
	C332 	INC DE 	increment DE and HL
	C333 	INC HL
	C334 	DJNZ sound_delay_addition_loop 	loop back to sound_delay_addition_loop three times
	C336 	POP BC 	restore outer loop counter
	C337 	DJNZ outer_sound_loop 	loop back to outer_sound_loop
	C339 	RET 	return