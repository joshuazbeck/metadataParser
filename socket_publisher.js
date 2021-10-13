//Currently this file is unused but it handles setting up a socket.io connection to push updates to listeners upon the change of the song
import express from 'express';
var app = express();
import s from 'http';
var server = s.createServer(app);
import {Server, Socket} from 'socket.io'; const io = new Server(server);

var connections = [];

//Arbitrary port
server.listen(parseInt(process.env.PORT) + 1 || 8081);
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