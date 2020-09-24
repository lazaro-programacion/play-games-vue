var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var messages = [{
  id: 1,
  text: "Hola soy un mensaje",
  author: "Carlos Azaustre"
}];

const partidas = [];

app.use(express.static('public'));

app.get('/hello', function (req, res) {
  res.status(200).send("Hello World!");
});

io.on('connection', function (socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);
  

  socket.on('new-message', function (data) {
    messages.push({
      text: data,
      author: "sabe dios"
    });
    console.log("mensaje recibido", data)

    console.log(messages)
    io.sockets.emit('messages', messages);
    //  io.sockets.emit('tonteria', "tonteria");

  });

  socket.on("jugar", (payload) => {
    const partidaBuscada = partidas.filter(i => !i.player2);

    const partida = partidaBuscada[0] ? {
      ...partidaBuscada[0],
      player2: socket.client.id
    } : {
        room: "lkksjkfd",
        player1: socket.client.id
      };
    partidas.push(partida)
    if (!partida.player2) {
      socket.emit("wait", partida)
    }
    else {
      socket.to("lkksjkfd").emit("start", partida)
      socket.emit("start", partida)
    }
  })

});

server.listen(8081, function () {
  console.log("Servidor corriendo en http://localhost:8081");
});