/**
 * Functions to query db 
 */
const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");

//get all exercises
const getExercises = async (req, res) => {  
    const user_id = req.user._id;
    //empty object for find all, sort by field in descending order (new first)
    const exercises = await Exercise.find({user_id}).sort({createdAt: -1});
    res.status(200).json(exercises);   
}
//get single exercise
const getExercise = async (req, res) => {  
    
    //const exercise = await Exercise.findById({id: req.body.params.id});  
    const {id} = req.params; 

    //make sure id is valid mongo type id so an invalid id doesnt crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"});
    }
    const exercise = await Exercise.findById(id);

    if(!exercise){
        //return so it stops
        return res.status(404).json({error: "No such exercise"})
    } 
    res.status(200).json(exercise);  
        
}
//craete a new exercise
const createExercise = async (req, res) => {
    
    //access body with req.body
    const {title, load, reps, sets} = req.body; 
    console.log(req.body);

    let emptyFields = [];
 
    if(!title){
        emptyFields.push('title');
    }
    if(load === null){
        emptyFields.push('load');
    }
    if(reps === null){
        emptyFields.push('reps');
    }
    if(sets === null){
        emptyFields.push('sets');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all all fields', emptyFields});
    }


    //Add doc to db
    try{
        //In the middleware we made sure each req has user and id
        const user_id = req.user._id;
        //Takes a obj and returns new document and the id or error
        const exercise = await Exercise.create({title, load, reps, sets, user_id});

        //Send back a OK response and the new document 
        res.status(200).json(exercise); 
    } catch(error){
        //Send error status and send json with the error msg
        res.status(400).json({error: error.message})
    }
    /* phase one to check routes working: 
    res.json({
        mssg: 'POST new exercise'
    }); */
}
//delete a exercise
const deleteExercise = async (req, res) => {
    
    //access body with req.body
    const {id} = req.params; 

    //make sure id is valid mongo type id so an invalid id doesnt crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"});
    }
    //returns document deleted
    const exercise = await Exercise.findOneAndDelete({_id: id});

    if(!exercise){
        //return so it stops
        return res.status(404).json({error: "No such exercise"})
    } 
    res.status(200).json(exercise); 

}
//update a exercise
const updateExercise = async (req, res) => {
    
    //access body with req.body
    const {id} = req.params; 

    //make sure id is valid mongo type id so an invalid id doesnt crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such exercise"});
    }
    //returns document updated
    await Exercise.findOneAndUpdate({_id: id}, {...req.body});
    const exercise = await Exercise.findById(id);

    if(!exercise){
        //return so it stops
        return res.status(404).json({error: "No such exercise"})
    } 
    res.status(200).json(exercise); 

}

module.exports = {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise
}