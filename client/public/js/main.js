
window.onload = function() {
    var c = document.getElementById("game-screen");
    var ctx = c.getContext("2d");
    while (true) {
        var d = new Date();
        var startTime = d.getTime();
        ctx.fillRect(0,0,1400,800);
        d = new Date();
        var elapsedTime = startTime - d.getTime();
        if (elapsedTime < 166) {
            sleep(elapsedTime);
        }
    }
}
