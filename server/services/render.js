const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3050/api/users')
        .then(function(response) {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.register = (req, res) => {
    res.render('register');
}
exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.table = (req, res) => {
    axios.get('http://localhost:3050/api/users')
        .then(function(response) {
            res.render('table', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.login_page = (req, res) => {
    res.render('login_page');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3050/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}