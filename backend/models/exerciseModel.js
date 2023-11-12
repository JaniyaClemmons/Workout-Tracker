/**
 * DB Document Model
 */
const mongoose = require('mongoose'); 

//const Schema = mongoose.Schema;

//structure of data
const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true}); //when we add/update a new doc, it adds create stamp

//model applys schema and creates a pluralized collection 
module.exports = mongoose.model('Exercise', exerciseSchema);


/* const Exercise = mongoose.model('Exercise', exerciseSchema);
model.exports = Exercise */ 