const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../users/users-model');

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const userForDb = { username, password: hash }

    User.add(userForDb)
    .then(user => {
        res.json(user)
    })
    .catch(err => res.json(err.message))
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    User.getBy({username})
    .first()
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)){
            req.session.user = user 
            res.json('Welcome back kid!')
        }else{
            res.status(401).json('invalid creds buddy')
        }
    })
    .catch(next)
})

router.get('/logout', (req, res, next) => {
    if(req.session && req.session.user) {
        req.session.destroy(err => {
            if(err){
                res.json('you can not leave yet')
            }else{
                res.json('goodbye')
            }
        })
    }else{
        res.json('you are not logged in')
    }
})

module.exports = router;