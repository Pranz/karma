var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var idCounter = 0;
var entities = {};

app.get('/api/hello', function (req, res) {
    res.send('Hello World!');
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });

    var playerName;

    socket.on('createPlayer', function(data) {
  	    if(typeof data.name === 'undefined') {

  	    }

  	    playerName = data.name;
    });

    socket.on('registerEntity', function(data) {
        console.log(data);
        entities[idCounter] = data;
        data.id = idCounter;
        idCounter += 1;
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
