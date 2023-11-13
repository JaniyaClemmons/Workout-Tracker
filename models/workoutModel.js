/**
 * DB Document Model
 */

const mongoose = require('mongoose'); 

//const Schema = mongoose.Schema;

//structure of data
const workoutSchema = new mongoose.Schema({
    title: {
        type: String
    },
    exercise_id: {
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true}); //when we add/update a new doc, it adds create stamp

//model applys schema and creates a pluralized collection 
module.exports = mongoose.model('Workout', workoutSchema);

