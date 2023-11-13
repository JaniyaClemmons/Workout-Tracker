/**
 * Register Routes 
 */

const express = require("express");


const {
    createExercise,
    getExercise,
    getExercises,
    deleteExercise,
    updateExercise
} = require("../controllers/exerciseController");

//require midleware 
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//fire middleware - req auth for all the following functions 
router.use(requireAuth);

/*Now we use router.get/post/delete/update the same way we used app before 
router.get('/', (req, res) => {})*/

//GET all Exercises
router.get('/', getExercises); 

//GET a single Exercise by id
//:id is a parameter
router.get('/:id', getExercise);

//POST a new Exercise 
//create is async so we need to wait for it to finish
router.post('/', createExercise);

//DELETES a single Exercise
router.delete('/:id', deleteExercise);

//UPDATES a single Exercise
router.put('/:id', updateExercise);

module.exports = router;

/* or const Exercise = new Exercise({title, load, reps})
        Exercise.save((err) =>{
            if(err){
                console.log(err);
            }
        }) */