import { useEffect} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//components 
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
//Hook to get user to send token in header
import { useAuthContext } from "../hooks/useAuthContext";

const Workouts = () => {
    
    const {workouts, dispatch} = useWorkoutsContext()

    const {user} = useAuthContext()
    
    //empty array says run effect one time, not everytime component rendered
    //we shouldnt make the callback function async so we create a function inside it
    useEffect(() => {
        const fetchWorkouts = async () => {
            
            //fetch data and store response = array of objects/db docs
            //address will get proxied
            const response = await fetch("/api/workouts/", {
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
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }
        //only fetchExercises if there is a user logged in 
        if(user){
            fetchWorkouts()
        }
        //we add user to the dependency array since we use it in here now 
    }, [dispatch, user]); //dispatch wont trigger this everytime but we have to add to depend. array 
   

    return (
        <div className="workout-page">
            <div className="workouts">
            
            {workouts && workouts.map((workout) => {
                return <WorkoutDetails key = {workout._id} workout = {workout} />
                //<p key = {exercise._id}> {exercise.title} </p>
           })}
            </div>
           
               <WorkoutForm /> 

            
           

        </div>
    )
}

export default Workouts;