const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    lecNo : String,
    courseId : String,
    timeStamp : String,
    note : String,
    studentId : String
});

//model
const Note = mongoose.model('Note',NoteSchema);
module.exports = Note;