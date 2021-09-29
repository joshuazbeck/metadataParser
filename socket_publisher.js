import express from 'express';
var app = express();
import s from 'http';
var server = s.createServer(app);
import {Server, Socket} from 'socket.io'; const io = new Server(server);

var connections = [];

server.listen(3000);
console.log("Server is running");

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connect: %s sockets are connected', connections.length);

    //diconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnect: %s sockets are connected', connections.length);
    })

})

export const publishJson = async (json) => {
    io.sockets.emit('metadata', json);
}