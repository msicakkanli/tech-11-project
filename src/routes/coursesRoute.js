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


  module.exports = router;