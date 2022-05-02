const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const Course = require("./models/Course");
const Lecture = require("./models/Lecture");
const Note = require("./models/Note");
const Professor = require("./models/Professor");
const Review = require("./models/Review");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI =
  "mongodb+srv://niveshduppalapudi:niveshpwa@cluster0.7tmjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const routes = require("./routes/student");
mongoose.connect(MONGODB_URI || "mongodb://localhost/pwa_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

const data = {
  title: "Prof ff",
  body: "hello world", ////////////
};
// const nCourse = new Professor(data);
// nCourse.save((error)=>{
//     if(error){
//         console.log('Error Course')
//     }
//     else{
//         console.log('Data saved');
//     }
// })

app.use(morgan("tiny"));
app.use("/", routes);
app.listen(PORT, console.log(`Server is starting at ${PORT}`));
