const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./users');

const courseSchema = new mongoose.Schema({
    user:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title : {
        type: String,
        required: [true, 'Title is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    estimatedTime: {
        type: String,
    },
    materialsNeeded: {
        type: String
    },
    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    steps :[
        {
           id : {
               type : String
           } ,
           stepNumber : {
               type : Number
           },
           title : {
               type: String,
               required: [true, 'Step title is required.']
           },
           description :{
               type: String,
               required:[true, 'Step description is required.']
           }
        }
    ]
});



const Course = mongoose.model('Course', courseSchema);
module.exports = Course;