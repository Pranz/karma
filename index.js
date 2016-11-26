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
  socket.on('my other event', function (data) {
    console.log(data);
  });
});