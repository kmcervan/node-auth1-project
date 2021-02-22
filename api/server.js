const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

// Routers will go here

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// connect Routers to servers here

server.get('/', (req, res) => {
    res.json({ api: "is alive!"});
})

module.exports = server;