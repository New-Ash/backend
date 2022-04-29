const express = require('express');
const router = express.Router();

// const BlogPost = require('../models/blogPost');
const Course = require('../models/Course');
// const Lecture = require('../models/Lecture');
const Note = require('../models/Note');
// const Professor = require('../models/Professor');
// const Review = require('../models/Review');
// const Student = require('../models/Student');


router.post('/note',(req,res)=>{
    const notes = req.body.notes;

    for (let note of notes) {
        const newNote = new Note(note)
        newNote.save((err)=>{
            if(err){
                res.status(404).json({msg: 'Sorry,server error'});
            }
            else{
                console.log('Added in notes');
                res.status(200).json({
                    msg:'data has been stored in db'
                });
            }
        })
    }

});

module.exports = router;