const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Student = require("../../models/Student");

router.post("/course/content", (req, res) => {
  Lecture.find({ courseId: req.body.courseId })
    .then((lectures) => {
      //   const toSend = lectures.map((lec) => ({
      //     num: lec.lecNo,
      //     date: lec.date,
      //     title: lec.title,
      //   }));
      res.send(lectures);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.post("/course/enroll", (req, res) => {
  Student.findOne({ studentId: req.body.studentId }, (err, foundStudent) => {
    if (err) {
      console.log(err);
    } else if (foundStudent) {
      Course.findOne({ courseId: req.body.courseId }, (err, foundCourse) => {
        if (err) {
          console.log(err);
        } else if (foundCourse) {
          foundStudent.courses = foundStudent.courses.concat(foundCourse);
          foundStudent.save((err) => {
            if (err) console.log(err);
          });
          res.send({ student: foundStudent, updated: true });
        }
      });
    }
  });
});

router;

module.exports = router;
