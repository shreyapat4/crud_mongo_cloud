"use strict";

/*jshint camelcase: false */

var AzureOAuth2Strategy = require("passport-azure-oauth2");
var jwt = require("jwt-simple");

function AzureOAuthStrategy() {
    this.passport = require("passport");

    console.log("ntest", process.env.clientID);

    this.passport.use("provider", new AzureOAuth2Strategy({
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.callbackUri,
            prompt: 'login',
            state: false
        },
        function(accessToken, refreshtoken, params, profile, done) {
            var user = jwt.decode(params.id_token, "", true);
            done(null, user);
        }));

    this.passport.serializeUser(function(user, done) {
        done(null, user);
    });

    this.passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = new AzureOAuthStrategy();