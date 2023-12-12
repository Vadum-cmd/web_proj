const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const passport = require('passport');
const expressSession = require('express-session');
const sequelize = require('./database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let count = 0;
const MAX_USERS_PER_SERVER = 1;
let registeredUsers = 0;

io.on('connection', (socket) => {
  console.log('User connected');

  // Check for available slots
  if (registeredUsers >= MAX_USERS_PER_SERVER) {
    socket.emit('noAvailability');
    return;
  }

  // Increment registered users count
  registeredUsers++;

  // Send current count to the connected user
  socket.emit('count', count);

  // Increment count every second and broadcast to all connected users
  const countInterval = setInterval(() => {
    count++;
    io.emit('count', count);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('User disconnected');

    // Decrement registered users count on disconnect
    registeredUsers--;

    // Clear the count interval when the user disconnects
    clearInterval(countInterval);
  });

  // Handle user registration event
  socket.on('registerUser', ({ username }) => {
    // Do your user registration logic here

    // Emit a response back to the client
    socket.emit('registerResponse', { success: true });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server 1 is running on port ${PORT}`);
});
