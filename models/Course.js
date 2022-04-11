const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseName : String,
     profId : String  ///////////
});

//model
const Course = mongoose.model('Course',CourseSchema);
module.exports = Course;