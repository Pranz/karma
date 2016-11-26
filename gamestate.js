let Player = require('./player');

module.exports =  class {
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

    getEntities () {
        let ret = {};
        for(let key in this.players) {
            ret[key] = {pos: this.players[key].pos, type:"player"};
        }

        return ret;
    }

    // A plaer with ID playerID wants to place a trap
    // creates a trap in traps if player can place
    placeTrap(playerID) {

    }

    placeWall(playerID) {

    }

    playerMove(playerID, delta) {
        this.players[playerID].onMove(delta, []);
    }

    playerPunch(playerID) {
        this.players[playerID].onPunch(this.monsters);
    }

    // Adds a layer to the player list and
    // returns an ID for the player
    createPlayer(playerID) {
        // pos, size, health, strength, texture, hitSpeed, movementSpeed, direction
        this.players[playerID] = new Player({x: 40, y: 30}, {width:10, height:10}, 1000, 100, "", 10, 1, 0);
    }
}
