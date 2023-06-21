const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
        min: 5,
    },
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("passport", UserSchema);
module.exports = User;