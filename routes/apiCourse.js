const express = require('express');
const router = express.Router();

// const BlogPost = require('../models/blogPost');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
// const Note = require('../models/Note');
// const Professor = require('../models/Professor');
// const Review = require('../models/Review');
// const Student = require('../models/Student');


router.get('/course',(req,res)=>{
    // const data = {
    //     username : 'nivesh',
    //     age :5
    // };
    // res.json(data);
    
    Lecture.find({courseId : req.body.courseId })
    .then((data)=>{
        console.log('Data',data);
        res.send(data);
    })
    .catch((error)=>{
        console.log('error',error)
    });
});

module.exports = router;