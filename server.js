
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
io.on('connection',function(socket){
    console.log('connected');
});

//appじゃなくてhttp
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
// https://socket.io/docs/v3/server-initialization/
http.listen(8080,()=> {
  console.log('Start Express Server');
});