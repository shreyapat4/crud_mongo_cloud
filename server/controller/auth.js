const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const morgan = require('morgan');
const passport = require('passport');
const app = express();
/* REGISTER USER */
const register = async(req, res) => {
    try {
        const {
            username,
            password,
            // picturePath,
            // friends,
            // location,
            // occupation,
        } = req.body;

        // const salt = await bcrypt.genSalt();
        // const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({

            username,
            password,
            // password: passwordHash,
            // picturePath,
            // friends,
            // location,
            // occupation,
            // viewedProfile: Math.floor(Math.random() * 10000),
            // impressions: Math.floor(Math.random() * 10000),
        });
        // const savedUser = await newUser.save();
        // // res.status(201).json(savedUser);
        // console.log(newUser, '@@@@@');
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        console.log(username, password, "user+pass in auth")
            // User.register(newUser, password, async(err, registeredUser) => {
            //     console.log(username, password, "user+pass1")
            //     if (err) {
            //         // Handle error
            //         return res.status(500).json({ error: err.message });
            //     }
            //     console.log(username, password, "user+pass2")
            //         // User registered successfully
            //         // You can perform any additional operations or send a response here
            //     return res.status(200).json({ message: 'User registered successfully' });
            // });
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

        // User.register({ username, active: false }, password);
        // res.redirect('/');
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
        // console.log(bcrypt.compare(password, user.password))
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (user.password !== password) return res.status(400).json({ msg: "Invalid credentials. " });
        // console.log(isMatch)
        // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // delete user.password;
        // res.status(200).json({ token, user });
        req.login(user, (err) => {
            if (err) {
                console.log(err)
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/table");
                });
            }
        });
        // console.log('before redirect');
        // res.redirect('/table');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { register, login };