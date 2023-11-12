import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//components 
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import CalendarComp from "../components/Calendar"
//Hook to get user to send token in header
import { useAuthContext } from "../hooks/useAuthContext";



const Home = () => {

    const { workout, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    function trimedDate(dateObj) {
        dateObj = (dateObj.toString().substring(0, 15)).replaceAll(' ', '');
        return dateObj;
    }
    const [date, updateDate] = useState(new Date());



    //empty array says run effect one time, not everytime component rendered
    //we shouldnt make the callback function async so we create a function inside it

    useEffect(() => {
        const fetchWorkout = async () => {
            //fetch data and store response = array of objects/db docs
            //address will get proxied
            const response = await fetch(`/api/workouts/${trimedDate(date)}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //pass the json into something we can work with - array of obj
            const json = await response.json();

            //Only do this if we get a response/ no error 
            if (response.ok) {

                //json is full array of exercises
                //sets the exercises in the global variable 
                dispatch({ type: "SET_WORKOUT", payload: json })
                //console.log(workout);
            }
            if (!response.ok) {
                dispatch({ type: "SET_WORKOUT", payload: null })
            }

        }
        //only fetchExercises if there is a user logged in 
        if (user) {
            fetchWorkout()
        }
        //we add user to the dependency array since we use it in here now 
    }, [dispatch, user, date]); //dispatch wont trigger this everytime but we have to add to depend. array 





    return (
        <div className="home">
            <CalendarComp onDateChange={updateDate} />
            {workout == null ?
                <WorkoutForm date={trimedDate(date)} /> : <WorkoutDetails workout={workout} />}



        </div>
    )
}

export default Home;