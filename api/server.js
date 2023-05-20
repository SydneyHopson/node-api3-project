const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies



const usersRouter = require('./users/users-router')

server.use(express.json())

// remember express by default cannot parse JSON in request bodies

// global middle-wares and the user's router need to be connected here

server.use('/api/users', usersRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;


