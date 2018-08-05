const mongoose = require('mongoose');
const bycrpt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        
    },
    emailAddress : {
        type: String,
         unique: [true, 'The e-mail adress is already exist'],
         required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
//authenticate user data 
userSchema.statics.authenticate = function (emailAddress, password, callback) {
    User.findOne({ emailAddress : emailAddress})
    .exec(function (error, user) {
        if (error) {
            return callback(error)
        } else if (!user)  {
            let err = new Error('User not found!')
            err.status = 400;
            return callback (err);
        }
        bycrpt.compare(password, user.password, function (error, result) {
            if (result === true) {
                return callback(null, user )
            } else {
                return callback();
            }
        })
    })
}

//hash password 
userSchema.pre('save', function (next) {
    let user = this;
    bycrpt.hash(user.password, 10 , function (err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', userSchema);
module.exports = User;