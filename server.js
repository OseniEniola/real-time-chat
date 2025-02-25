const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get('/', (req, res) => {
    res.send('Real-time chat server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (data) => {
        io.emit('message', data); // Broadcast message to all users
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//rubber duck
