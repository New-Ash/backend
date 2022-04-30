const express = require("express");
const router = express.Router();

router.use(express.json());

const Lecture = require("../models/Lecture");
const Note = require("../models/Note");
const Review = require("../models/Review");

router.post("/lecture", (req, res) => {
  const notesToSend = [];
  const reviewsToSend = [];
  const vidLink = null;
  Note.find({ $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }] }, (err, foundNotes) => {
    if (err) {
      console.log("error", error);
    } else {
      notesToSend.push(foundNotes.filter((element) => element.public || element.studentId === req.body.studentId));
    }
  });
  Review.find(
    {
      $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }, { studentId: req.body.studentId }],
    },
    (err, foundReviews) => {
      if (err) {
        console.log("error", error);
      } else {
        reviewsToSend = foundReviews;
      }
    }
  );
  Lecture.findOne(
    {
      $and: [{ courseId: req.body.courseId }, { lecNo: req.body.lecNo }],
    },
    (err, foundLec) => {
      if (err) {
        console.log(err);
      } else if (foundLec) {
        vidLink = foundLec.recordingLink;
      }
    }
  );
  res.send({ link: vidLink, notes: notesToSend, reviews: reviewsToSend });
});

module.exports = router;
