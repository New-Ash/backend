const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    studentName : String,
    dateOfBirth : String,
     courses : [], //////////////
    studentEmail : String
});

//model
const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;