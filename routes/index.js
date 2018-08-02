'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users')
const Course = require('../models/courses')


// send a friendly greeting for the root route
router.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the Course Review API'
    });
  });

  // get course by Id
router.get('/api/courses/:id', function (req,res,next) {
    Course.findById(req.params.id)
     .exec(function (error,course) {
       if (error){
         return next(error);
       } else {
         return res.json(course)
      }
  })
});
  //get all courses 
router.get('/api/courses/', function (req,res,next) {
  Course.find()
   .exec(function (error,courses) {
     if (error){
       return next(error);
     } else {
       return res.send(courses.title)
    }
  })
});

// get users
router.get('/api/users', function (req,res,next) {
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
router.post('/api/users',function (req,res,next) {
 
        if (req.body.password !== req.body.confirmPassword){
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }

        let userData = {
          fullName : req.body.fullName,
          emailAddress : req.body.emailAddress,
          password: req.body.password
        };
        User.create(userData, function (error,user) {
          if (error) {
            return next(error)
          }else {
            return res.json(user);
          }
        })


})
  module.exports = router;