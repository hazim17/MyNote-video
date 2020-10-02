const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //hash users password
const jwt = require('jsonwebtoken'); //how we authenticate user without needing them to log back in


const User = require('../models/user');


//first route
router.post('/', async (req, res) => {

    const { username, password } = req.body; // the body is going to have fields or parameter or values with where key is named username and also password (so these have to match whatever is inside of the body)

    if(password.length < 6) {
        res.status(500).json({msg: "Password length must be greater than 6 character"})
        return;
    }

    let newUser = new User({
        username,
        passwordHash: bcrypt.hashSync(password, 10), //this line is how we avoid storing actual password in database; so this will make the password unique, and human can read easily. You can pass in not just '10', but whatever you want either number or string.
        numNotes: 0
    }) 

    newUser
        .save()
        .then(user => {
            jwt.sign({
                username: newUser.username //this is how we return an auth token / create auth token to return to client
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                })
            }); 
        }).catch(err => {
            console.log(err)
            res.status(500).json({msg: `User ${err.keyValue['username']} already exists. Try Loggin In.`})
        })
})


//second route
router.post("/logic", (req, res) => {
    const { username, password } = req.body
    User.findOne({username})
        .then(user => {
            if(!user) {
                res.status(500).json({msg:"No User with that username: " + username})
                return;
            } else if(!bcrypt.compareSync(password, user.passwordHash)) {
                res.status(500).json({msg: "Invalid Password"})
            }

            jwt.sign({
                username: newUser.username //this is how we return an auth token / create auth token to return to client
            }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                })
            }); 
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})
