var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public'))

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

  setInterval(function() {
  	socket.emit('entities', api.get.entities());
  }, 100);
});


var api = {};
api.get = {};
api.get.entities = function() {
	var mockData = [
		{
			type: 'player',
			health: 100,
			strength: 300,
			pos: {x: 10, y: 10},
			texture: 'url.png',
		},

		{
			type: 'wall',
			health: 100,
			strength: 300,
			pos: {x: 11, y: 11},
			texture: 'url.png',
		},
	];

	return mockData;
}
>>>>>>> c5a890f1bfa3c3336ae1164c84b8487e3552bd3a
