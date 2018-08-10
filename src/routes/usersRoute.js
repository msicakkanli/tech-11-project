'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users')
const mid = require('../mid/index');



//get users
router.get('/users', mid.authUser, function (req,res,next) {
  res.status(200)
  res.json(req.loggedInUser)
  // User.find()
  //  .exec(function (error,users) {
  //    if (error){
  //      return next(error);
  //    } else {
  //      return res.json(users)
  //   }
  // })
});


// add user
router.post('/users', function(req, res, next){
  User.findOne({emailAddress: req.body.emailAddress})
      .exec(function(err, user){
        if(err) next(err)
        if(user){
          const err = new Error('User already exists.');
          err.status = 401;
          return next(err);
        } else{
          const user = new User(req.body);
          user.save(function(err, user){
            if(err) return next(err)
            res.status(201);
            res.location('/');
            res.end();
          })
        }
      })
});


  module.exports = router;