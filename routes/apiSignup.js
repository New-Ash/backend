const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost');
// const Course = require('../models/Course');
// const Lecture = require('../models/Lecture');
// const Note = require('../models/Note');
const Professor = require('../models/Professor');
// const Review = require('../models/Review');
const Student = require('../models/Student');

const middleware = (req,res,next) => {
    const authToken = req.headers['Authorization']

    if(jwt.verify(authToken))
        next()
    else
        res.status(401).json({})
}

router.post('/signup',(req,res)=>{
    const data = {
        name: req.body.name,
        pwd: req.body.pwd,
        email: req.body.email
    };
    if(req.body.type === 'Student'){
        const newStudent = new Student({
            ...data,
            studentId: req.body.studentId
        })
        newStudent.save((err)=>{
            if(err){
                res.status(404).json({msg: 'Sorry,server error'});
            }
            else{
                console.log('Added in student');
                res.status(200).json({
                    msg:'data has been stored in db'
                });
            }
        })
    }
    else{
        const data = new Professor(data)

        const newProfessor = new Professor(data)
        newProfessor.save((err)=>{
            if(err){
                res.status(404).json({msg: 'Sorry,server error'});
            }
            else{
                console.log('Added in student');
                res.status(200).json({
                    msg:'data has been stored in db'
                });
            }
        })
    }
    
});

module.exports = router;