var SPEED = 3;


window.onload = function() {
    var c = document.getElementById("game-screen");
    var ctx = c.getContext("2d");
    var state = getInitialState();
    document.addEventListener('keypress', function(event) { onKeyPress(state, event); });
    document.addEventListener('keyup', function(event) { onKeyUp(state, event); });
    gameLoop(ctx, state);


    var socket = io.connect('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
}

function gameLoop(ctx, state) {
    var d = new Date();
    var startTime = d.getTime();

    update(state);
    render(ctx, state);

    d = new Date();
    var elapsedTime = startTime - d.getTime();
    if (elapsedTime < 16) {
        setTimeout(function() {
            gameLoop(ctx, state);
        }, 16 - elapsedTime);
    } else {
        gameLoop(ctx, state);
    }
}

function getInitialState() {
    return {
        player: {
            x: 30,
            y: 30
        },
        keymap: {}
    };
}

function update(state) {
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
    console.log(keyCode);
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
    ctx.beginPath();
    ctx.arc(state.player.x,state.player.y,50,0,Math.PI*2,true);
    ctx.stroke();
}
