'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/courses')


  // get course by Id
router.get('/courses/:id', function (req,res,next) {
    Course.findById(req.params.id)
    .populate('user reviews')
     .exec(function (error,course) {
       if (error){
         return next(error);
       } else {
         return res.json(course)
      }
  })
});

  //get all courses id and title filelds
router.get('/courses/', function (req,res,next) {
  Course.find()
   .exec(function (error,courses) {
     if (error){
       return next(error);
     } else {
      const courseDetail = courses.map(function (key) {
        return {
          id : key.id,
          title : key.title
        }
      })
      return res.json(courseDetail)
    }
  })
});

//create course 
router.post('/courses', function(req, res, next) {
  const course = new Course(req.body);
  //console.log(course)
  course.save(function(err, course) {
    if(err) return res.json(err);
    res.status(201);
    res.location('/courses').json();
  });
});

//update course by ID
router.put('/courses/:id', function (req,res,put) {
  var id = req.params.id
  var update = req.body
  Course.findByIdAndUpdate(id, update, function (err, updatedDoc) {
    if (err) {
      const err= new Error("Course doesn't exist")
      err.status=401;
      return next(err)
    } else {
      res.status(204);
      res.location('/');
      res.end();
    }
  } )
})

  module.exports = router;