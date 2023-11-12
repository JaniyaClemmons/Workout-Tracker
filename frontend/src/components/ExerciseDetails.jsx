//Now we can use this to grab dispatch function
import { useExercisesContext } from "../hooks/useExercisesContext"
//date fns npm install date-fns to format dates
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useAuthContext } from "../hooks/useAuthContext"

/*
const ExerciseDetails = (props) => {
    const {title, reps, load, createdAt, _id} = props.Exercise; 
*/
const ExerciseDetails = ({exercise}) => {
    const {title, reps, load, createdAt, _id} = exercise
    console.log(exercise)

    //grab dispatch function 
    const {dispatch} = useExercisesContext();

    const { user } = useAuthContext(); 

     

    //Call Api 
    const handleClick = async () => {
        if(!user){
            return; 
        }
        const response = await fetch(`/api/exercises/${_id}`, 
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }           
        })
        const json = await response.json()

        if(response.ok){
            //After added to database. update global variable 
            dispatch({type: "DELETE_EXERCISE", payload: json}) 
            console.log("Exercise Deleted" , json)
        }

    }

    return (
        <div className = "exercise-details">
        
            <h4>{title}</h4>
            <p> <strong> Load (kg): </strong>{load} </p>
            <p> <strong> Reps: </strong>{reps} </p>
            <p>
                {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
        

    )
}

export default ExerciseDetails