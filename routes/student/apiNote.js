const express = require("express");
const router = express.Router();

// const BlogPost = require('../models/blogPost');
const Course = require("../models/Course");
// const Lecture = require('../models/Lecture');
const Note = require("../models/Note");
// const Professor = require('../models/Professor');
// const Review = require('../models/Review');
// const Student = require('../models/Student');

router.post("/note/add", (req, res) => {
  const newNote = new Note(req.body.note);
  newNote.save((err, savedNote) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in notes");
      res.send({ noteid: savedNote._id, message: "Note added" });
    }
  });
});

router.post("/note/delete", (req, res) => {
  Note.deleteOne({ _id: req.body.noteid }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Note deleted" });
    }
  });
});

router.post("/note/update", (req, res) => {
  const note = req.body.note;
  Note.findById(note.noteid, (err, foundNote) => {
    if (err) {
      console.log(err);
    } else if (foundNote) {
      foundNote.content = note.content;
      foundNote.save((err) => {
        if (err) console.log(err);
        else {
          res.send({ message: "Note updated" });
        }
      });
    }
  });
});

module.exports = router;
