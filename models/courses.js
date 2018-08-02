const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    estimatedTime: {
        type: String,
    },
    materialsNeeded: {
        type: String
    },
    reviews : [
        {
            id : {
                type : String
            }
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
               required: true
           },
           description :{
               type: String,
               required:true
           }
        }
    ]

});

const Course = mongoose.model('courses', CourseSchema);
module.exports = Course;