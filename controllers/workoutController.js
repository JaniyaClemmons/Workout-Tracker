/**
 * Functions to query db 
 */
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {  
    console.log(req.user);
    const user_id = req.user._id;
    //empty object for find all, sort by field in descending order (new first)
    const workouts = await Workout.find({user_id});
    res.status(200).json(workouts);   
}
//get single workout
const getWorkout = async (req, res) => {  
    
    //find workout by date
    const {date} = req.params; 
    

    const workout = await Workout.findOne({date});

    if(!workout){
        //return so it stops
        return res.status(404).json({error: "No such workout"})
    } 
    res.status(200).json(workout);  
        
}
//create a new workout
const createWorkout = async (req, res) => {
    
    //access body with req.body
    const {title, exercise_id, date} = req.body; 

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!exercise_id){
        emptyFields.push('exercise_id');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }


    //Add doc to db
    try{
        //In the middleware we made sure each req has user and id
        const user_id = req.user._id;
        //Takes a obj and returns new document and the id or error
        const workout = await Workout.create({title, exercise_id, date, user_id});

        //Send back a OK response and the new document 
        res.status(200).json(workout); 
    } catch(error){
        //Send error status and send json with the error msg
        res.status(400).json({error: error.message})
    }
    /* phase one to check routes working: 
    res.json({
        mssg: 'POST new workout'
    }); */
}
//delete a workout
const deleteWorkout = async (req, res) => {
    
    //access body with req.body
    const {id} = req.params; 

    //make sure id is valid mongo type id so an invalid id doesnt crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    //returns document deleted
    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        //return so it stops
        return res.status(404).json({error: "No such workout"})
    } 
    res.status(200).json(workout); 

}
//update a workout
const updateWorkout = async (req, res) => {
    
    //access body with req.body
    const {id} = req.params; 

    //make sure id is valid mongo type id so an invalid id doesnt crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }
    //returns document updated
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});

    if(!workout){
        //return so it stops
        return res.status(404).json({error: "No such workout"})
    } 
    res.status(200).json(workout); 

}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}