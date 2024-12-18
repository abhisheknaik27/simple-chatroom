const express = require('express');
const socketio = require('socket.io');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const http = require('http');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 4000;
const app  = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000', // Your front-end URL
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        

        socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to Room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`});
        
        // io.to(user.room).emit('roomData', { room: user.room , users: getUsersInRoom(user.room)});
        socket.join(user.room);
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        // io.to(user.room).emit('roomData', { user: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('disconnect', () => {
       const user = removeUser(socket.id);
       if(user){
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} left the chatroom`});
       }
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

