const express = require('express')
const WebSocketServer = require('websocket').server;
const serveStatic = require('serve-static');

// Setting up the http server
var app = express();
app.use(serveStatic('./nike-client/build'));
 
var server = app.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

// setting up the web socket server.
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

let lastId = 0;
let clients = [];

wsServer.on('connect', function(ws) {
    let id = lastId;
    lastId += 1;
    clients.push([id,ws]);
    
    ws.on('message', function(msg) {
        clients.forEach(client => {
            if(client[0] === id) return;
            client[1].sendUTF(msg.utf8Data);
        });
    });
});
