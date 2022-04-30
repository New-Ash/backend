const express = require("express");
const router = express.Router();

router.use(express.json());

const Student = require("../models/Student");

// const middleware = (req,res,next) => {
//     const authToken = req.headers['Authorization']

//     if(jwt.verify(authToken))
//         next()
//     else
//         res.status(401).json({})
// }

router.post("/signup", (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    studentId: req.body.studentId,
  });
  newStudent.save((err) => {
    if (err) {
      res.status(404).json({ msg: "Sorry,server error" });
    } else {
      console.log("Added in student");
      res.status(200).json({
        msg: "data has been stored in db",
      });
    }
  });
});

module.exports = router;
