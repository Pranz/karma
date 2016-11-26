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

io.on('connection', function (socket) {
    socket.on('createPlayer', function(data) {
        console.log("Creating player");

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

        console.log(entities);
    });

    /*
    socket.on('registerEntity', function(data) {
        console.log(data);
        entities[idCounter] = data;
        data.id = idCounter;
        idCounter += 1;
    });*/

    socket.on('movePlayer', (data) => {
        if(typeof entities[socket.id] == {}) {
            console.warn('entities[socket.id] isnt set');
            return;
        }

        console.log(entities, entities[socket.id]);

        entities[socket.id].pos.x += data.dx;
        entities[socket.id].pos.y += data.dy;
    });

    setInterval(function() {
        socket.emit('entities', api.get.entities());
    }, 100);
});

var api = {};
api.get = {};
api.get.entities = function() {
    return entities;
}


function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
