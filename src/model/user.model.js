const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    licenseID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true

    },
    fullName: {
        type: String,
        uppercase: true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    position: {
        type: String,
    },
    image: {
        type: String,
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;