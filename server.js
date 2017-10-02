// Importing the global modules to use to setup the server
const express = require('express');
const path = require('path');
const {forEach, map} = require('lodash');

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
let openChats = [];
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
    // Constructing the new user chat between the main user and the user who is selected
    const newUserChat = {
      chatID: getUser.id,
      [getUser.name]: {
        id: getUser.id,
        name: getUser.name,
        messages: [],
      },
      [mainUser.name]: {
        id: mainUser.id,
        name: mainUser.name,
        messages: [],
      },
    };

    openChats.push(newUserChat);

    io.emit('openNewChat', newUserChat);
  });

  // Add Messages to the socket and emit them to the react component
  socket.on('messageAdded', payload => {
    // Setting a variable to get the non main user who is sending or receiving a message
    const getNonMainUser = users.find(user => user.id === payload.chatID).name;
    /*
     * Here we are mapping through the open chats and updating the sent and received for the users
     * We are using the ID to grab the correct chat to update and checkin to see who sends the message
     * If it is the main user we are updating it's sent and the other users received
     * If it is the other user in the chat we are updating their sent and the main users received
     */
    const updateChat = map(openChats, chat => {
      if (chat.chatID === payload.chatID) {
        if (payload.user === mainUser.name) {
          return {
            ...chat,
            [getNonMainUser]: {
              ...chat[getNonMainUser],
              messages: [
                ...chat[getNonMainUser].messages,
                {
                  timeStamp: payload.timeStamp,
                  text: payload.text,
                  type: 'received',
                },
              ],
            },
            [mainUser.name]: {
              ...chat[mainUser.name],
              messages: [
                ...chat[mainUser.name].messages,
                {
                  timeStamp: payload.timeStamp,
                  text: payload.text,
                  type: 'sent',
                },
              ],
            },
          };
        }
        return {
          ...chat,
          [getNonMainUser]: {
            ...chat[getNonMainUser],
            messages: [
              ...chat[getNonMainUser].messages,
              {
                timeStamp: payload.timeStamp,
                text: payload.text,
                type: 'sent',
              },
            ],
          },
          [mainUser.name]: {
            ...chat[mainUser.name],
            messages: [
              ...chat[mainUser.name].messages,
              {
                timeStamp: payload.timeStamp,
                text: payload.text,
                type: 'received',
              },
            ],
          },
        };
      }
      return chat;
    });

    // We are setting the opent chats to the new array formed from mapping and updating the chats
    openChats = updateChat;

    io.emit('messageAdded', openChats);
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});
