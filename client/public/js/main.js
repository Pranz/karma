
window.onload = function() {
    var c = document.getElementById("game-screen");
    var ctx = c.getContext("2d");
    var state = getInitialState();
    document.addEventListener('keypress', function(event) { onKeyPress(state, event); });
    gameLoop(ctx, state);
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
        }
    };
}

function update(state) {
    
}

function onKeyPress(state, event) {
    if (event.keyCode === 37) {
        state.player.x -= 1;
    } else if (event.keyCode === 38) {
        state.player.y -= 1;
    } else if (event.keyCode === 39) {
        state.player.x += 1;
    } else if (event.keyCode === 40) {
        state.player.y += 1;
    }
}

function render(ctx, state) {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,800,600);
    ctx.beginPath();
    ctx.arc(state.player.x,state.player.y,50,0,Math.PI*2,true);
    ctx.stroke();
}
