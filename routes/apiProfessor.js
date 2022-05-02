const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Note = require("../models/Note");
const Professor = require("../models/Professor");
const Review = require("../models/Review");
const Student = require("../models/Student");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());

router.post("/signup", (req, res) => {
  console.log(req.body);
  const newProfessor = new Professor({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  newProfessor.save((err) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in professor");
      res.status(200).json({
        msg: "data has been stored in db",
      });
    }
  });
});

router.post("/login", (req, res) => {
  Professor.findOne({ email: req.body.email }, (err, foundProfessor) => {
    if (err) {
      console.log("error ", err);
      res.status(404);
    } else {
      if (foundProfessor) {
        if (foundProfessor.password === req.body.password) {
          res.send({ professor: foundProfessor, found: true, match: true });
        } else {
          res.send({ found: true, match: false });
        }
      } else {
        res.send({ found: false });
      }
    }
  });
});

//course api left
router.post("/course/content", (req, res) => {
  Lecture.find({ courseId: req.body.courseId })
    .then((lectures) => {
      res.send(lectures);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/course/add", (req, res) => {
  Professor.findOne({ email: req.body.email }, (err, foundProfessor) => {
    if (err) {
      console.log(err);
    } else if (foundProfessor) {
      const newCourse = new Course({
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        profName: foundProfessor.name,
      });
      newCourse.save((err, savedCourse) => {
        if (err) {
          console.log(err);
        } else {
          foundProfessor.courses = foundProfessor.courses.concat(savedCourse);
          foundProfessor.save((err, savedProf) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ professor: savedProf, updated: true });
            }
          });
        }
      });
    }
  });
});

router.post("/lecture", (req, res) => {
  let notesToSend = [];
  let reviewsToSend = [];
  let vidLink = null;
  Note.find({ $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }] }, (err, foundNotes) => {
    if (err) {
      console.log("error", error);
    } else {
      // console.log(foundNotes)
      notesToSend.push(foundNotes.filter((element) => element.public || element.studentId === req.body.studentId));
      console.log(notesToSend);
      //check
      Review.find(
        {
          $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }, { studentId: req.body.studentId }],
        },
        (err, foundReviews) => {
          if (err) {
            console.log("error", error);
          } else {
            reviewsToSend = foundReviews;
            res.send({ notes: notesToSend, reviews: reviewsToSend });
          }
        }
      );
    }
  });
  // Review.find(
  //   {
  //     $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }, { studentId: req.body.studentId }],
  //   },
  //   (err, foundReviews) => {
  //     if (err) {
  //       console.log("error", error);
  //     } else {
  //       reviewsToSend = foundReviews;
  //     }
  //   }
  // );
  // Lecture.find(
  //   {
  //     $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }],
  //   },
  //   (err, foundLec) => {
  //     if (err) {
  //       console.log(err);
  //     } else if (foundLec) {
  //       vidLink = foundLec.recordingLink;
  //     }
  //   }
  // );
});

// send  {note  : {json object}}
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

//user can delete public notes
router.post("/note/delete", (req, res) => {
  Note.deleteOne({ _id: mongoose.Types.ObjectId(req.body.noteId) }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Note deleted" });
    }
  });
});

router.post("/note/update", (req, res) => {
  const note = req.body.note;
  Note.findById(note.noteId, (err, foundNote) => {
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

router.post("/review/add", (req, res) => {
  const newReview = new Review(req.body.review);
  newReview.save((err, savedReview) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      res.send({ reviewId: savedReview._id, message: "Review added" });
    }
  });
});

router.post("/review/delete", (req, res) => {
  const newReview = new Review(req.body.review);
  Review.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reviewId) }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Review deleted" });
    }
  });
});

module.exports = router;
