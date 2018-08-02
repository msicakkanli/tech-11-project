const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        
    },
    emailAddress : {
        type: String,
         unique: true,
         required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;