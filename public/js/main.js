var PLAYER_SPEED = 3;
var MONSTER_SPEED = 5;
var LEFT = 0;
var UP = 1;
var RIGHT = 2;
var DOWN = 3;

var KEYS = {
    LEFT : 37,
    UP : 38,
    RIGHT : 39,
    DOWN : 40,
    SPACE : 32
};

var FPS = 60;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

var ctx, socket;

window.onload = function() {
    console.log("Window onload");

    var c = document.getElementById("game-screen");
    ctx = c.getContext("2d");
    var state = getInitialState();

    document.addEventListener('keydown', (event) => {
        onKeyDown(state, event);
    });
    document.addEventListener('keyup', (event) => {
        onKeyUp(state, event);
    });

    socket = io.connect();

    socket.emit('createPlayer', {
        name : 'Player1'
    });

    socket.on('entities', (entities) => {
        state.entities = {};
        for (var entityID in entities) {
            state.entities[entityID] = entities[entityID];
        }
    });

    socket.on('sendPlayerId', (id) => {
        console.log("sendPlayerId = ", id)
        state.playerId = id;
    });

    setInterval(() => {
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
        keymap: {},
        playerId: null
    };
}

function update(state, items) {
    handleMovement(state);
}

function handleMovement(state) {
   if (state.keymap[KEYS.SPACE]) {
        console.log("Space")
        socket.emit('playerPunch', {});
    }
   var dx = 0;
    var dy = 0;

    dx -= state.keymap[KEYS.LEFT] ? 1 : 0;
    dx += state.keymap[KEYS.RIGHT] ? 1 : 0;
    dy -= state.keymap[KEYS.UP] ? 1 : 0;
    dy += state.keymap[KEYS.DOWN] ? 1 : 0;

    if(dx === 0 && dy === 0) {
        return;
    }

    // Send to server
    state.entities[state.playerId].pos.x += dx;
    state.entities[state.playerId].pos.y += dy;
    socket.emit('movePlayer', {
        dx: dx,
        dy: dy
    });

    
}

function onKeyDown(state, event) {
    preventDefaultOnlyFor(KEYS, event);
    state.keymap[event.keyCode] = true;
}

/**
 * Without this ctrl+r doesnt work etc
 */
function preventDefaultOnlyFor(keymap, event) {
    for(var key in keymap) {
        console.log(keymap[key]);
        if(event.keyCode === keymap[key]) {
            event.preventDefault();
        }
    }
}

function onKeyUp(state, event) {
    state.keymap[event.keyCode] = false;
}

function clearScreen() {
    drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT, "white");
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.stroke();
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawText(text, x, y, color) {
    ctx.font = "24px serif";
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

function render(state) {
    clearScreen();

    for (var id in state.entities) {
        var entity = state.entities[id];        
        switch(entity.type) {
        case 'player':
            drawRect(entity.pos.x, entity.pos.y, entity.size.width, entity.size.height, "black");
            drawText("Health = " + entity.health, 10, 20, "red");
            drawText("Stregth = " + entity.strength, 200, 20, "red");
            drawText("Karma = " + entity.karma, 400, 20, "red");
            break;
        case 'monster':
            drawRect(entity.pos.x, entity.pos.y, entity.size.width, entity.size.height, "darkgreen");
            break;
        default:
            console.warn("Unsupported entity type!");
            break;
        }
    }
}

