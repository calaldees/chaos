// https://spectrumcomputing.co.uk/pub/sinclair/games-maps/c/Chaos_CreatureStats.png
// This guide/screenshot shows different radius's for mov, fly, rng
// I could not decipher the difference from the disassembly
// https://www.archaos.co.uk/chaos-disassembly/maps/move-combat.html
// So I just hard coded the patterns here.
// I don't know if this is going to help, but yolo
manoeuvre = `
--44444
-4333334
432222234
432111234
432101234
432111234
432222234
-4333334
--44444
`
flying = `
-----666
---6655566
--655444556
-65443334456
-55432223455
6543211123456
6543210123456
6543211123456
-55432223455
-65443334456
--655444556
---6655566
-----666
`
range = `
------6
----66566
--665545566
--644434446
-65432223456
-65421112456
6543210123456
-65421112456
-65432223456
--644434446
--665545566
----66566
------6
`