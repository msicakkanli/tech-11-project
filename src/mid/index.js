const User = require('../models/users');
const auth = require('basic-auth');

function authUser(req,res,next) {
  const user = auth(req)
  
  if(user.name && user.pass){
    User.authenticate(user.name, user.pass, function (error, user) {
      if(error){
        const err = new Error('wrong email or password');
        err.status = 403;
        return next(err);
      }  else {
        req.loggedInUser = user; 
        next()
      }
    })
  }else{
    const err = new Error('Email and password are required.')
    err.status = 401;
    return next(err);
  }
}

module.exports.authUser = authUser;
