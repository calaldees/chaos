export const sound_data = {
//    engaged_sound_effect: `$01,$04,$01,$02,$03,$04,$01,$01,$01,$01`, 
//}
//export const sound_data2 = {

    // https://zxnet.co.uk/spectrum/chaos/sounds/sound_effect_07.mp3
    S60            : `$04,$0C,$04,$03,$02,$01,$01,$07,$50,$22`, //Key Boop
    //S61            : `$14,$06,$02,$07,$14,$03,$FB,$14`,   // New spell   (?not 10 bytes?)
    sound_effect_01: `$04,$03,$0A,$0A,$28,$46,$02,$02,$46,$28`,
    sound_effect_02: `$06,$0C,$00,$14,$28,$3C,$02,$06,$0C,$28`,
    sound_effect_03: `$0C,$04,$0A,$0A,$28,$07,$02,$02,$46,$1E`,
    sound_effect_04: `$01,$01,$01,$02,$03,$02,$00,$00,$00,$00`,
    sound_effect_04: `$0A,$05,$01,$05,$1E,$08,$03,$07,$FD,$F6`,
    sound_effect_06: `$14,$03,$28,$28,$46,$64,$02,$03,$3C,$64`,
    sound_effect_07: `$14,$03,$01,$02,$03,$04,$01,$01,$01,$01`,
    sound_effect_08: `$32,$01,$0A,$1E,$32,$46,$14,$32,$50,$8C`,
    sound_effect_09: `$05,$04,$0A,$14,$1E,$28,$0A,$14,$1E,$28`,
    sound_effect_10: `$F0,$02,$14,$2E,$39,$50,$FF,$FE,$FD,$FC`,
    sound_effect_11: `$14,$02,$28,$28,$46,$64,$02,$03,$3C,$64`,
    sound_effect_12: `$01,$01,$0A,$0A,$28,$46,$02,$02,$46,$28`,
    sound_effect_13: `$01,$04,$01,$02,$03,$04,$01,$01,$01,$01`,
    sound_effect_14: `$FF,$01,$FF,$FF,$FF,$FF,$FC,$FC,$FC,$FC`,
    engaged_sound_effect: `$20,$04,$FF,$FF,$1E,$3C,$FA,$FA,$28,$50`, 
    sound_effect_16: `$3F,$04,$01,$01,$28,$43,$04,$04,$E2,$B0`,
    S10            : `$06,$03,$01,$01,$14,$1E,$04,$04,$11,$17`,
    sound_effect_17: `$01,$01,$FF,$FF,$FF,$FF,$FF,$FF,$FF,$FF`,
    sound_effect_18: `$32,$01,$01,$01,$FF,$FF,$32,$32,$CE,$CE`,
    sound_effect_19: `$7F,$01,$01,$01,$0F,$12,$05,$05,$17,$25`,
    sound_effect_20: `$14,$03,$FF,$FF,$FF,$FF,$FF,$FF,$F9,$E9`,
    sound_effect_21: `$5A,$01,$FF,$FF,$FF,$FF,$00,$FF,$FF,$FE`,
    sound_effect_22: `$18,$0C,$0C,$2E,$50,$A0,$18,$2F,$65,$9A`,
    sound_effect_23: `$14,$04,$17,$2D,$38 - $14,$04,$17,$2D,$38`,  // This overlaps sound_effect_temp with the result that when copied the same 5 bytes are repeated.

    //sound_effect_temp
    //C2E8 	DEFB $3F 	Outer loop counter.
    //C2E9 	DEFB $04 	Middle loop counter.
    //C2EA 	DEFB $FD,$FD,$C6,$93 	Delay counters.
    //C2EE 	DEFB $04,$04,$E2,$B0 	Values to add to delay.
}