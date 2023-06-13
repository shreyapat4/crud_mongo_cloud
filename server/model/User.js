const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    // firstName: {
    //     type: String,
    //     required: true,
    //     min: 2,
    //     max: 50,
    // },
    // lastName: {
    //     type: String,
    //     required: true,
    //     min: 2,
    //     max: 50,
    // },
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
    // picturePath: {
    //     type: String,
    //     default: "",
    // },
    // friends: {
    //     type: Array,
    //     default: [],
    // },
    // location: String,
    // occupation: String,
    // viewedProfile: Number,
    // impressions: Number,
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("passport", UserSchema);
module.exports = User;