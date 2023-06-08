const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const morgan = require('morgan');
const app = express();
/* REGISTER USER */
const register = async(req, res) => {
    try {
        const {
            email,
            password,
            // picturePath,
            // friends,
            // location,
            // occupation,
        } = req.body;

        // const salt = await bcrypt.genSalt();
        // const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({

            email,
            password,
            // password: passwordHash,
            // picturePath,
            // friends,
            // location,
            // occupation,
            // viewedProfile: Math.floor(Math.random() * 10000),
            // impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

/* LOGGING IN */
const login = async(req, res) => {
    try {
        console.log("we in here")
        const { email, password } = req.body;
        // console.log(req.body, "req");
        // console.log(email, password, "e+p");
        const user = await User.findOne({ email: email });
        console.log(user.password, "userP")
        console.log(user.email, "userE")

        if (!user) return res.status(400).json({ msg: "User does not exist. " });
        // console.log(bcrypt.compare(password, user.password))
        // const isMatch = await bcrypt.compare(password, user.password);
        if (user.password !== password) return res.status(400).json({ msg: "Invalid credentials. " });
        // console.log(isMatch)
        // if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // delete user.password;
        // res.status(200).json({ token, user });
        res.redirect('/table');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { register, login };