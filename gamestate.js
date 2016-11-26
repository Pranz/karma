let Player = require('./player');
let Monster = require('./monster');

module.exports =  class {
    constructor() {
        this.gridWidth = 80;
        this.gridHeight = 60;
        this.players = {}

        this.monsters = [
            new Monster({x:0, y:0}, {width:10, height:10}, 100, 10, "", 1, 10, 0),
            new Monster({x:100, y:100}, {width:10, height:10}, 100, 10, "", 1, 10, 3.14),
            new Monster({x:400, y:300}, {width:10, height:10}, 100, 10, "", 1, 10, 3/2*Math.PI)
        ];
        this.walls = [];
        this.traps = [];
        setInterval(() => {
           this.monsterTick(100, this.players); 
        }, 100);
    }

    monsterTick(delta, entityList) {
        // How manny monsters should spawn??
        /*let numMonstersToSpawn = numMonstersToSpawn();
        for (; numMonstersToSpawn != 0; numMonstersToSpawn--) {
            this.monsters.push(spawnMonster(/* Strength, health, possition, speed, ??* /))
        //*/
        
        for(let key in this.monsters) {
            this.monsters[key].tick(delta, entityList);
        }
    }

    getEntities () {
        let ret = {};
        for(let key in this.players) {
            ret[key] = {
                pos: this.players[key].pos, 
                size: this.players[key].size, 
                type:"player"
            };
        }

        for(let key in this.monsters) {
            ret["monster"+key] = {
                pos:this.monsters[key].pos, 
                size: this.monsters[key].size, 
                type:"monster"
            };
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
