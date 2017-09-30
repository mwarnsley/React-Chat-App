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

// Using the static path for the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serving the index.html file to the root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Having the server listen on the port specified
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});