const express = require('express');
const socketio = require('socket.io');
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
    console.log('new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const error = true; 
    })
    socket.on('disconnect', () => {
        console.log('user left');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

