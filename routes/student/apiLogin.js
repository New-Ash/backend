const express = require("express");
const router = express.Router();

router.use(express.json());

const Student = require("../models/Student");

// const middleware = (req, res, next) => {
//   const authToken = req.headers["Authorization"];

//   if (jwt.verify(authToken)) next();
//   else res.status(401).json({});
// };
// /student/login
router.post("/login", (req, res) => {
  Student.findOne({ email: req.body.email }, (err, foundStudent) => {
    if (err) {
      console.log("error ", err);
      res.status(404);
    } else {
      if (foundStudent) {
        if (foundStudent.password === req.body.password) {
          res.send({ student: foundStudent, found: true, match: true });
        } else {
          res.send({ found: true, match: false });
        }
      } else {
        res.send({ found: false });
      }
    }
  });
});

module.exports = router;
