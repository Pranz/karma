var SPEED = 3;
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;

var FPS = 60;


window.onload = function() {
    var c = document.getElementById("game-screen");
    var ctx = c.getContext("2d");
    var state = getInitialState();
    document.addEventListener('keypress', function(event) { onKeyPress(state, event); });
    document.addEventListener('keyup', function(event) { onKeyUp(state, event); });

    var socket = io.connect('http://localhost:3000');

    socket.emit('createPlayer', {name : prompt('Name:')});
    socket.emit('registerEntity', {
        type: 'player',
        x: 30,
        y: 30,
        direction: UP
    });

    socket.on('entities', function (data) {
        for (var entity in data) {
            state.entities[entity] = data[entity];
        }
    });

    gameLoop(ctx, state);
}

function gameLoop(ctx, state) {
    var d = new Date();
    var startTime = d.getTime();

    update(state);
    render(ctx, state);

    setInterval(function() {
        gameLoop(ctx, state);
    }, 1000/FPS);
}

function getInitialState() {
    return {
        entities: {},
        keymap: {}
    };
}

function update(state, items) {
    for (var key in state.keymap) {
        if (state.keymap[key]) {
            onKeyDown(state, key);
        }
    }
}

function onKeyPress(state, event) {
    event.preventDefault();
    state.keymap[event.keyCode] = true;
}

function onKeyUp(state, event) {
    state.keymap[event.keyCode] = false;
}

function onKeyDown(state, keyCode) {
    if (keyCode == 37) {
        state.player.x -= SPEED;
    } else if (keyCode == 38) {
        state.player.y -= SPEED;
    } else if (keyCode == 39) {
        state.player.x += SPEED;
    } else if (keyCode == 40) {
        state.player.y += SPEED;
    }
}

function render(ctx, state) {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,800,600);
    for (var id in state.entities) {
        var ent = state.entities[id];
        switch(ent.type) {
        case 'player':
            ctx.beginPath();
            ctx.arc(ent.x,ent.y,25,0,Math.PI*2,true);
            ctx.stroke();
            break;
        }
    }
}

