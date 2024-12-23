/*
-- User actions --
(Are attack and move the same thing?)
Move unit
   unit mov reduction
   modify map
Attack (unit from unit, i to i) [for match/hash?]
    check pre
    resolve combat
        +add effects
        +remove unit
Enter/Use
    Mount/Castle/Tree
Cast spell
    player
    spell id
    optional location
    resolve
        run spell func
        +add effects
        +add
        +remove
        +UpdateState(remove spell)

State Modifiers
These are not actions as they are not user entered - these are modifications to state
Add Effects
Remove (unit, player, i)
Add unit(player, unit, i)
Move
Update state (e.g. number of moves left, dead,)

Whole State
(be able to transfer the whole state to clients)
Current state has hash
Clients can see if their state is out of date and request the whole state
*/