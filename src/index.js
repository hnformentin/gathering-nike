const WebSocketServer = require('websocket').server;
const http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server
});

let lastId = 0;
let clients = [];

wsServer.on('connect', function(ws) {
    let id = lastId;
    lastId += 1;
    clients.push([id,ws]);
    
    ws.on('message', function(msg) {
        clients.forEach(client => {
            if(client[0] === id) continue;
            client[1].sendUTF(msg.utf8Data);
        });
    });
});
