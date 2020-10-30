const express = require('express')
const WebSocketServer = require('websocket').server;
const serveStatic = require('serve-static');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuid} = require('uuid');
const blobName = 'message.txt';

// Setting up the http server
var app = express();
app.use(serveStatic('./www'));
 
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


async function SaveBlob(message) {
    console.log(message);
    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    //TODO add correct connection string in fromConnectionString
    const blobServiceClient = BlobServiceClient.fromConnectionString();
    // Create a unique name for the container
    const containerName = 'text';
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Upload data to the blob
    if(message.length>0) {
       const uploadBlobResponse = await blockBlobClient.upload(message, message.length);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
    }
}

wsServer.on('connect', function(ws) {
    let id = lastId;
    lastId += 1;
    clients.push([id,ws]);
    
    ws.on('message', function(msg) {
        SaveBlob(msg.utf8Data);
        clients.forEach(client => {
            if(client[0] === id) return;
            client[1].sendUTF(msg.utf8Data);
        });
    });
});
