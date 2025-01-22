
    // UI Test
    //new UISpells(ui)
    //new UICharacterSelect(ui)
    //const uis = new UIStats(ui)
    //uis.drawStats("King Cobra")

    // Sprite tests

    //drawFont_color(c, `Chaos \\033[91;103mMobile\\033[0m Test`, 0, 176)

    //c.drawImage(sprites.animation.twirl[8], 10*16,7*16)

    // Early draw tests without model or animation
    //for (let i=0 ; i<sprites.wizard.length ; i++) {
    //    c.drawImage(shiftImage(sprites.wizard[i], Object.values(COLOR)[i%7+1]) , (i+1)*16, 16)
    //}
    //for (let i=0 ; i<monster_sprites.length ; i++) {
    //    c.drawImage(shiftImage(monster_sprites[i], COLOR.white) , (i%16)*16, 32+(Math.floor(i/16)*16))
    //}


    // Model
    //for (let [i, unit_name] of enumerate(Object.keys(unit_data))) {
    //    game.map.setUnit(new Unit(unit_data[unit_name]), i)
    //}
    //game.map.getUnit(0).status.add("corpse")
    //game.map.getUnit(3).setPos(5) // HACK - test sprite flipping


    // Gfx Effects
    /*
    this.gfx_effects.addEffect(15*5+10, new SpriteAnimationEffect(sprites.animation.twirl))
    this.gfx_effects.addEffect(15*5+11, new SpriteAnimationEffect(sprites.animation.dragon_breath))
    this.gfx_effects.addEffect(15*5+12, new SpriteAnimationEffect(sprites.animation.attack_effect))
    this.gfx_effects.addEffect(15*5+13, new SpriteAnimationEffect(sprites.animation.explosion))
    this.gfx_effects.addEffect(15*5+14, new SpriteAnimationEffect(sprites.animation.woop))
    for (let i of [70,71,72,(71-15),(71+15)]) {
        this.gfx_effects.addEffect(i, new HighlightEffect())
    }
    this.gfx_effects.addEffect(48, new InvertEffect())
    */

    // Draw whole screen on first start
    //this.gfx_dispatch.draw(c, 0)
    //drawFont_color(c, `This is a test of word wrap, I hope it works, I sure do!`, 16, 78, 128)

    // sound temp visualization
    //c.save()
    //c.translate(0,100)
    //drawAudioFloatStream(c, sounds['engaged_sound_effect'])
    //c.restore()


// ---
        //if (frame % 100 == 0) {
        //    //playSound(this.audioContext, 'engaged_sound_effect')
        //    const name = 'engaged_sound_effect'
        //    //this.play_audio(`sound/${name}.mp3`)
        //}
