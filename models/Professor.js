const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const ProfessorSchema = new Schema({
    profName : String,
    courses : Array, ////////////
    profEmail : String
});

//model
const Professor = mongoose.model('Professor',ProfessorSchema);
module.exports = Professor;