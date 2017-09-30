// Importing the global modules to use to setup the server
const express = require('express');
const path = require('path');

// Setting the app variable to the express function for the server
const app = express();
/*
 * Setting the PORT variable
 * For development it will listen on port 3000
 * For production it will listen to the environment variable port that's set using process.env.PORT
 */
const PORT = process.env.PORT || 3000;
// Setting the connections array for the amount of connections
const connections = [];
// Setting the users array for the amount of users
const users = [];
// Setting the io variable for connecting to socket.io
let io;

// Using the static path for the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serving the index.html file to the root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Having the server listen on the port specified
const server = app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

// Setting up the socket.io connection
io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
  // Disconnect function
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets connected', connections.length);
    io.emit('disconnect');
  });

  // Add Messages to the socket and emit them to the react component
  socket.on('messageAdded', payload => {
    const newMessage = {
      timeStamp: payload.timeStamp,
      text: payload.text,
    };
    io.emit('messageAdded', newMessage);
  });
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});
