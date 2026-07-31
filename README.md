Chaos: The Battle of Wizards (Remake)
============================

An attempt at recreating [Julian Gollop](https://en.wikipedia.org/wiki/Julian_Gollop)'s seminal classic - [Chaos: The Battle of Wizards](https://en.wikipedia.org/wiki/Chaos:_The_Battle_of_Wizards) - with a web mobile phone interface (with a shared main screen - similar to pattern used by [jackbox.tv](https://jackbox.tv/) style games)


This Project - Development Links
--------------------------------

* `make serve_files_local`
    * [src/test.html](./src/test.html) Simulate main screen + 3 mobile clients (requires network server running)
    * [src/index.html?websocket_url=ws://localhost:9800/](./src/index.html?websocket_url=ws://localhost:9800/) individual screen


Implementation
--------------

* Browser Vanilla Javascript
    * No Libraries
    * No Transpilation (minimal build chain)
    * Goal: The entire game should fit in a single `index.html.gz` gzip'ed file that is <=48kb (the original spectrum game ran in 48k)
* Network
    * Goal: [MQTT](https://mqtt.org/) for network comms
    * Currently using homemade [channelServer](https://github.com/calaldees/channelServer)


Chaos: References
-----------------

* Original Instructions
    * [WorldOfSpectrum: Original Instructions (GamesWorkshop BigBox 1984).txt](https://worldofspectrum.net/pub/sinclair/games-info/c/Chaos.txt)
    * [nvg](http://rk.nvg.ntnu.no/sinclair/instructions/chaos.html) plain-html
* Disassembly
    * [The complete Chaos RAM disassembly](https://www.archaos.co.uk/chaos-disassembly/) 2026 Lewis Lane
        * [GitHub](https://github.com/lewster32/chaos-disassembly)
        * [Blog](https://www.rotates.org/2026/04/30/disassembling-chaos/)
    * [The incomplete commented Chaos disassembly](https://zxnet.co.uk/spectrum/chaos/index.html)
* Gameplay footage
    * [YouTube: Chaos： The Battle of Wizards Walkthrough ｜ 1985 ｜ Games Workshop ｜ ZX Spectrum [sh97mNYpsIw]](https://www.youtube.com/watch?v=sh97mNYpsIw)
* Gameplay description/comentary
    * [Data Driven Gamer: Game 409: Chaos: The Battle of Wizards](https://datadrivengamer.blogspot.com/2024/05/game-409-chaos.html) 2024
* Remakes
    * [Chaos Remakes Wiki](https://chaosremakes.fandom.com/wiki/Chaos_Remakes_Wiki)
    * [lewster32/archaos](https://github.com/lewster32/archaos) started 2009(?) Lewis Lane
        * Isometric + (Lewis made a [bangin soundtrack!](https://soundcloud.com/lewster32/sets/archaos-picks) is there anything this dude can't do!?)
        * (Made by the guy that did the recent 2026 disassembly and owns(?) the remake wiki)
    * [chaosgroove](https://chaosgroove.wordpress.com/category/graphics/) 2007
