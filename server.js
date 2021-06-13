
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require("socket.io")(http)
// const PORT = process.env.PORT || 7000;

const rootPath = 'docs';
app.use(express.static(rootPath, { index: false }));

var players = []


//index.htmlを勝手に見に行かない指定
const serveIndex = require('serve-index');
app.use(serveIndex(rootPath, {
  icons: true,
  view: 'details'
}));

//SocketIOの待ち受け
io.on('connection', function (socket) {
  socket.on("connected", function () {
    //fitst_player
    if (players.length == 0) {
      const p = { no: 1, id: socket.id }
      players.push(p)
      io.to(socket.id).emit("set_player", p)
      return;
    }
    //secoud_player or next_player
    if (players.length == 1) {
      const other_player = players[0]
      //すでに入っているプレイヤーの番号が1なら2, 2なら1
      const num = other_player.no == 1 ? 2 : 1
      const p = { no: num, id: socket.id }
      players.push(p)
      io.to(socket.id).emit("set_player", p)
      return;
    }
  });
  socket.on("camera_tracking", function (camera_data) {
    socket.broadcast.emit("player_moving", camera_data);
  });



  socket.on("disconnect", function () {
    const result = players.filter(p => p.id != socket.id);
    players = result;
  });

});

//appじゃなくてhttp
// WARNING !!! app.listen(8080); will not work here, as it creates a new HTTP server
// https://socket.io/docs/v3/server-initialization/
http.listen(8080, () => {
  console.log('Start Express Server');
});