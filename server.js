const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const session = require('express-session'); // session middleware
const passport = require('passport');
const path = require('path');
const connectDB = require('./server/database/connection');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

dotenv.config({ path: 'config.env' })

const passportAuth = require("./server/controller/passport_auth")

const User = require('./server/model/User'); // User Model

const app = express();


const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyparser.urlencoded({ extended: true }))
app.use(passportAuth.passport.initialize());
app.use(passportAuth.passport.session());
app.get("/", passportAuth.passport.authenticate("provider", { successRedirect: "/table", failureRedirect: "/login" }));


// set view engine
app.set("view engine", "ejs")

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => { console.log(`Server is running on ${process.env.callbackUri}`) });