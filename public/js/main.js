var SPEED = 3;
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;

var FPS = 60;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var ctx, state;

window.onload = function() {
    var c = document.getElementById("game-screen");
    ctx = c.getContext("2d");
    state = getInitialState();

    document.addEventListener('keypress', function(event) { onKeyPress(state, event); });
    document.addEventListener('keyup', function(event) { onKeyUp(state, event); });

    var socket = io.connect('http://localhost:3000');

    //socket.emit('createPlayer', {name : prompt('Name:')});
    socket.emit('registerEntity', {
        type: 'player',
        x: 30,
        y: 30,
        direction: UP
    });

    socket.on('entities', function (entities) {
        for (var entityID in entities) {
            state.entities[entityID] = entities[entityID];
        }
    });

    setInterval(function() {
        gameLoop(state);
    }, 1000/FPS);
}

/**
 * Will be called 60 times per second
 */
function gameLoop(state) {
    update(state);
    render(state);
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

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.stroke();
}

function render(state) {
    clearScreen();

    for (var id in state.entities) {
        var entity = state.entities[id];
        switch(entity.type) {
        case 'player':
            drawCircle(entity.pos.x, entity.pos.y, 25);
            break;
        }
    }
}

