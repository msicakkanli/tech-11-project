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
userSchema.statics.authenticate = function (email, password, callback) {
    console.log('kontrol user name and email')
    User.findOne({ emailAddress : email})
    .exec(function (error, user) {
        console.log(user)
        if (error) {
            return callback(error)
        } else if ( !user )  {
            let err = new Error('User not found!')
            err.status = 400;
            return callback (err);
        }
        bycrpt.compare(password, user.password, function (error, result) {
            if (result === true) {
                console.log("password correct")
                return callback(null, user )
            } else {
                console.log("password wrong")
                let err = new Error('The password is wrong')
                err.status = 401;
                return callback(err);    
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
module.exports = User