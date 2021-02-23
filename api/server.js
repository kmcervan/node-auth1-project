const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

// Routers will go here
const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

const config = {
    name:'sessionId',
    secret: 'this is a secret, keep it safe',
    cookie:{
        maxAge: 1000 * 60 * 60,
        secure:false,
        httpOnly:true
    },
    resave:false,
    saveUnitialized:false,

    store: new KnexSessionStore({
        knex:require('../database/connection'),
        tablename:'sessions',
        sidfilename:'sid',
        createTable:true,
        clearInterval:1000 * 60 * 60
    })
}

server.use(session(config));
server.use(helmet());
server.use(express.json());
server.use(cors());

// connect Routers to servers here
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: "is alive!"});
})

module.exports = server;