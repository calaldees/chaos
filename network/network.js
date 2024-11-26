/*

OnBoot - gen random id - persist this in offline storage
Id is alphanumeric base (lowercase+numbers? base 36? always 4 digets - gen number between min and max)

onConnect - hello with id -
    get state with id in -
    if no response "we are the server!"
      - if game in offline_state - send over network

    send state update
*/