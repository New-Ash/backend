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

router.get('/login',(req,res)=>{
    const data = {
        pwd: req.body.pwd,
        email: req.body.email,
        type: req.body.type,
    };
    if(req.body.type === 'Student'){
        Student.findOne({email : data.email}, (err, foundStudent) => {
            if (err) {
                console.log('error ',error);
                res.status(404);
            } else {
                if (foundStudent) {
                    if (foundStudent.password === data.pwd) {
                        res.send({account: foundStudent});
                    } else {
                        res.send({match: false});
                    }
                } else {
                    res.send({found: false});
                }
            }
        });
    }
    else{
        Professor.findOne({email : data.email}, (err, foundProfessor) => {
            if (err) {
                console.log('error ',error);
                res.status(404);
            } else {
                if (foundProfessor) {
                    if (foundProfessor.password === data.pwd) {
                        res.send({account: foundProfessor});
                    } else {
                        res.send({match: false});
                    }
                } else {
                    res.send({found: false});
                }
            }
        });
    }
    
});

module.exports = router;