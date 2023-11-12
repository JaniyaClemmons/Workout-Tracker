
//date fns npm install date-fns to format dates
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import ExerciseDetails from "../components/ExerciseDetails";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

/*
const ExerciseDetails = (props) => {
    const {title, reps, load, createdAt, _id} = props.Exercise; 
*/

const WorkoutDetails = ({workout} )=> {
    const {dispatch} = useWorkoutsContext();
    
        
    
    const {title, exercise_id, date, _id} = workout; 
    
    const { user } = useAuthContext(); 
   
    const [exercises, updateExercises] = useState([]);
    
    useEffect(() => {
        const fetchExercises = () => {
                updateExercises([]); 
                exercise_id.forEach(async (id) =>  {
                const response = await fetch(`/api/exercises/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                //pass the json into something we can work with - array of obj
                const json = await response.json(); 
                
                
                updateExercises(oldExercises =>               
                    [...oldExercises, json]
                )
                
                
                //Only do this if we get a response/ no error 
                /*if(response.ok){
                    //setExercises(json); 
                    //json is full array of exercises
                    //sets the exercises in the global variable 
                    dispatch({type: "SET_EXERCISES", payload: json})
                }*/
            })
            
        
            
        }
        //only fetchExercises if there is a user logged in 
        if(user){
            fetchExercises()
        }
        }, [workout]
    )

    const handleClick = async () => {
        if(!user){
            return; 
        }
        const response = await fetch(`/api/workouts/${_id}`, 
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }           
        })
        const json = await response.json()

        if(response.ok){
            //After added to database. update global variable 
            dispatch({type: "DELETE_WORKOUT", payload: json}) 
            console.log("Workout Deleted" , json)
        }
    }

  

    return (
        <div className="workout">
            <h1>{title} <span className="material-symbols-outlined" onClick={handleClick}>delete</span></h1>
            
            {exercises && exercises.map((exercise) => {
                return (<div key = {exercise._id} className = "exercise-details">
        
                        <h4>{exercise.title}</h4>
                        <p> <strong> Load (kg): </strong>{exercise.load} </p>
                        <p> <strong> Reps: </strong>{exercise.reps} </p>
                        </div>
                )
              
           })}
        </div>
           
        

    )
}

export default WorkoutDetails