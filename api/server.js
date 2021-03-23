const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// connecting routers will go here
const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');

const server = express();

server.use(session({
    name:'pineapple',
    secret: 'shhh',
    cookie: {
        maxAge: 1000 * 10 * 1000,
        secure: false,
        httpOnly:false,
    },
    resave:false,
    saveUninitialized:false,
}));

server.use(helmet());
server.use(express.json());
server.use(cors());

//page connector goes here
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json('the api is ALIVEEEE');
})

module.exports = server;