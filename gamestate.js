class GameState {
    constructor() {
        this.gridWidth = 80;
        this.gridHeight = 60;
        this.players = {}

        this.monsters = [];
        this.walls = [];
        this.traps = [];
    }

    monsterTick(delta) {
        // How manny monsters should spawn??
        let numMonstersToSpawn = numMonstersToSpawn();
        for (; numMonstersToSpawn != 0; numMonstersToSpawn--) {
            this.monsters.push(spawnMonster(/* Strength, health, possition, speed, ??*/))
        }
        
        for( let key in this.monsters) {
        }


    }

    // A plaer with ID playerID wants to place a trap
    // creates a trap in traps if player can place
    placeTrap(playerID) {

    }

    placeWall(playerID) {

    }

    playerMove(playerID, delta) {
    }

    playerPunch(playerID) {
    }

    // Adds a layer to the player list and
    // returns an ID for the player
    createPlayer() {
        
    }
}
