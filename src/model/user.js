const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    password: {
        type: String,
        required: true,
        unique: true

    },
    licenseID: {
        type: String,
        required: true,
        unique: true
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;