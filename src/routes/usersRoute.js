'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users')



// get users
router.get('/users', function (req,res,next) {
  User.find()
   .exec(function (error,users) {
     if (error){
       return next(error);
     } else {
       return res.json(users)
    }
  })
});
// add user
router.post('/users',function (req,res,next) {
 
        if (req.body.password !== req.body.confirmPassword){
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }

        User.authenticate(req.body.password, req.body.emailAddress, function (error, user) {
          if (error || !user) {
            let err = new Error ('Wrong email or password')
            err.status = 401 
            return next(err)
          } else {
            req.session.userId = user._id
            return res.send('user authenticate')
          }
        })

        let userData = {
          fullName : req.body.fullName,
          emailAddress : req.body.emailAddress,
          password: req.body.password
        };
        User.create(userData, function (err,user) {
          if (err) {
            const err = new Error('The email adress is already exist')
            err.status = 401
            return next(err)
          }else {
            return res.json(user);
          }
        })


})
  module.exports = router;