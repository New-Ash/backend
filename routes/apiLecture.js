const express = require('express');
const router = express.Router();

// const BlogPost = require('../models/blogPost');
// const Course = require('../models/Course');
// const Lecture = require('../models/Lecture');
const Note = require('../models/Note');
// const Professor = require('../models/Professor');
// const Review = require('../models/Review');
// const Student = require('../models/Student');


router.get('/lecture',(req,res)=>{
    // const data = {
    //     username : 'nivesh',
    //     age :5
    // };
    // res.json(data);
    const notesToSend = [];
    const reviewsToSend = [];
    Note.find({$and : [{courseId : req.body.courseId}, {lecNo : req.body.lecNo} ]}, (err, foundNotes) => {
        if (err) {
            console.log('error',error)
        } else {
            notesToSend.push(foundNotes.filter((element) => (element.public || element.studentId === req.body.studentId)));
        }
    });
    Review.find({$and : [{courseId : req.body.courseId}, {lecNo : req.body.lecNo}, {studentId: req.body.studentId}]}, (err, foundReviews) => {
        if (err) {
            console.log('error',error)
        } else {
            reviewsToSend = foundReviews;
        }
    })
    res.send({notes: notesToSend, reviews: reviewsToSend});
});

module.exports = router;