let Gamestate = require('./gamestate');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var idCounter = 0;
var entities = {};

var playerName;
var socketData = {};

app.get('/api/hello', function (req, res) {
    res.send('Hello World!');
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

let gameState = new Gamestate();

io.on('connection', function (socket) {    
    socket.on('createPlayer', (data) => {
        api.push.createPlayer(data, socket);
    });

    socket.on('movePlayer', (data) => {
        api.push.movePlayer(data, socket);
    });

    setInterval(function() {
        socket.emit('entities', api.get.entities());
    }, 100);
});

var api = {};

// GET
api.get = {};
api.get.entities = function() {
    return gameState.getEntities();
}


// PUSH
api.push = {};
api.push.movePlayer = function(data, socket) {
    /*if(typeof entities[socket.id] == 'undefined') {
        console.warn('entities[socket.id] isnt set');
        return;
    }

    console.log(entities, entities[socket.id]);

    entities[socket.id].pos.x += data.dx;
    entities[socket.id].pos.y += data.dy;
    */
    gameState.playerMove(socket.id, {dx:data.dx, dy:data.dy});
}

api.push.createPlayer = function(data, socket) {
    console.log("Creating player");


    gameState.createPlayer(socket.id);
/*kk
    var player = {
        type: 'player',
        health: 1100,
        strength: 190,
        pos: {x: 20, y: 20},
        direction: 0,
        texture: 'todo.png',
        name: data.name,
    };
    entities[socket.id] = player;
    */
    socket.emit('sendPlayerId', socket.id);

}


function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
