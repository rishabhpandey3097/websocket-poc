const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,  {
    cors: {
        origin: "http://localhost:4200", // Replace with your Angular app's origin
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events from the client
  socket.on('custom-event', (data) => {
    if(data.data === 'hi') {
        socket.emit('server-response', {
            message: 'Hello'
        });
    }else if(data.data === 'bye') {
        socket.emit('server-response', {
            message: 'Goodbye'
        });
    }else {
        socket.emit('server-response', {
            message: 'Other message'
        });
    }
    
    // Send a response back to the client
    // socket.emit('server-response', { message: 'Hello, client!' });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
