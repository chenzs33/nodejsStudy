const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (client) => { 
    client.emit('hehe','Welcome');
    client.on('haha',(msg=>{
        console.log('haha'+msg)
    }))
 });

server.listen(3000,'0.0.0.0');