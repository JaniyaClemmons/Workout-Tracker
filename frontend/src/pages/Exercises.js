import { useEffect, useState} from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";
//components 
import ExerciseDetails from "../components/ExerciseDetails";

//Hook to get user to send token in header
import { useAuthContext } from "../hooks/useAuthContext";
import ExerciseForm from "../components/ExerciseForm";

const Exercises = () => {
    /**Use Context Hook instead
     * const [exercises, setExercises] = useState(null);
     */
    const {exercises, dispatch} = useExercisesContext()

    const {user} = useAuthContext()
  
    //empty array says run effect one time, not everytime component rendered
    //we shouldnt make the callback function async so we create a function inside it
    useEffect(() => {
        const fetchExercises = async () => {
            
            //fetch data and store response = array of objects/db docs
            //address will get proxied
            const response = await fetch("/api/exercises/", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //pass the json into something we can work with - array of obj
            const json = await response.json(); 

            //Only do this if we get a response/ no error 
            if(response.ok){
                console.log(json)
                //setExercises(json); 
                //json is full array of exercises
                //sets the exercises in the global variable 
                dispatch({type: "SET_EXERCISES", payload: json})
            }
        }
        //only fetchExercises if there is a user logged in 
        if(user){
            fetchExercises()
        }
        //we add user to the dependency array since we use it in here now 
    }, [dispatch, user]); //dispatch wont trigger this everytime but we have to add to depend. array 
   
    

    return (
        <div className="exercise-page">
            <div className="exercises">
            
            {exercises && exercises.map((exercise) => {
                return (                             

                    <ExerciseDetails  key = {exercise._id} exercise = {exercise} dispatch ={dispatch}/>                                      
                                      
                )
                
           })}
            </div>
           <div>
            <ExerciseForm />
           </div>

            
           

        </div>
    )
}

export default Exercises;