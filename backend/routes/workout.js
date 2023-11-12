/**
 * Register Routes 
 */

const express = require("express");


const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

//require midleware 
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//fire middleware - req auth for all the following functions 
router.use(requireAuth);

/*Now we use router.get/post/delete/update the same way we used app before 
router.get('/', (req, res) => {})*/

//GET all Workouts
router.get('/', getWorkouts); 

//GET a single Workout by id
//:id is a parameter
router.get('/:date', getWorkout);

//POST a new Workout 
//create is async so we need to wait for it to finish
router.post('/', createWorkout);

//DELETES a single Workout
router.delete('/:id', deleteWorkout);

//UPDATES a single Workout
router.patch('/:date', updateWorkout);

module.exports = router;

/* or const Workout = new Workout({title, load, reps})
        Workout.save((err) =>{
            if(err){
                console.log(err);
            }
        }) */