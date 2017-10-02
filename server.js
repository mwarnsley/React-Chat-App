// Importing the global modules to use to setup the server
const express = require('express');
const path = require('path');
const {forEach} = require('lodash');

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
// Setting the main user for the chats
let mainUser = {};
// Setting the currently opened chats
const openChats = [];
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
    // Looping through the connections and finding out which one was disconnected
    forEach(users, (user, i) => {
      if (user.id === socket.id) {
        users.splice(i, 1);
      }
    });
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log('Disconnected: %s sockets connected', connections.length);
    io.emit('disconnect', users);
  });

  // Add the user when joining
  socket.on('userJoined', payload => {
    const newUser = {
      id: socket.id,
      name: payload.name,
    };

    users.push(newUser);

    io.emit('userJoined', users);
    console.log(`User Joined ${payload.name}`);
  });

  // Sets the main user who is logged in
  socket.on('setMainUser', () => {
    mainUser = users[0];
    io.emit('setMainUser', mainUser);
  });

  // Set the user we are having the current conversation with
  socket.on('setUser', user => {
    const userSet = {
      id: socket.id,
      name: user.name,
    };
    io.emit('setUser', userSet);
  });

  // Opening a new chat connection between the main user and active user
  socket.on('openNewChat', username => {
    const getUser = users.find(user => user.name === username);
    const newUserChat = {
      chatID: getUser.id,
      [getUser.name]: {
        id: getUser.id,
        name: getUser.name,
        received: [],
        sent: [],
      },
      [mainUser.name]: {
        id: mainUser.id,
        name: mainUser.name,
        received: [],
        sent: [],
      },
    };

    openChats.push(newUserChat);

    io.emit('openNewChat', newUserChat);
  });

  // Add Messages to the socket and emit them to the react component
  socket.on('messageAdded', payload => {
    const newMessage = {
      timeStamp: payload.timeStamp,
      text: payload.text,
      user: payload.user,
    };
    io.emit('messageAdded', newMessage);
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});
