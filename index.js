const express = require('express');
const socket = require('socket.io');

let app = express();
let server = app.listen('4000', ()=>{
    console.log('listening for requests on port 4000');
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection', socket.id);

    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        if(data.message != ""){
            socket.broadcast.emit('typing', `<p><em>${data.handle} is typing a message...</em></p>`);
        } else {
            socket.broadcast.emit('typing', "");
        }
    });
});
