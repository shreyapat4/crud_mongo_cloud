const express = require('express');
const route = express.Router()
const auth = require("../controller/auth");
const services = require('../services/render');
const controller = require('../controller/controller');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

route.post('/auth/logout', (req, res) => {
    console.log('11111');
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');

    });
})
route.post('/auth/login', auth.login);
route.post('/auth/register', auth.register);
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

route.get('/table', connectEnsureLogin.ensureLoggedIn('/'), services.table);
route.get('/register', services.register);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

// route.get('/login-page', services.login_page)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route