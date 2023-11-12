import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useExercisesContext } from "../hooks/useExercisesContext";

import DropDown from "../components/DropDown";

import { useAuthContext } from "../hooks/useAuthContext";
import ExerciseDetails from "./ExerciseDetails";

const WorkoutForm = ({ date }) => {

    //Allows us to update the global context variable
    const { dispatch: dispatchWorkout } = useWorkoutsContext();
    const { exercises, dispatch } = useExercisesContext();



    const { user } = useAuthContext();

    const [exercise_id, setExerciseIds] = useState(
        [])
    //console.log(exercise_id.length)

    const [title, setTitle] = useState('');
    const workout =
        { title, date, exercise_id }

    const [emptyFields, setEmptyFields] = useState([])

    const [error, setError] = useState(null);

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
            if (response.ok) {

                //setExercises(json); 
                //json is full array of exercises
                //sets the exercises in the global variable 
                dispatch({ type: "SET_EXERCISES", payload: json })

            }

        }
        //only fetchExercises if there is a user logged in 
        if (user) {
            fetchExercises()
        }
        //we add user to the dependency array since we use it in here now 
    }, [dispatch, user]); //dispatch wont trigger this everytime but we have to add to depend. array 




    /*function handleSubmit(event){
        event.preventDefault(); 
        console.log(event.target);
    }*/
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }
        console.log(JSON.stringify(workout));

        //fetch api to send post request 
        //arg 2 is a req object with method, body, and headers
        const response = await fetch("/api/workouts/", {
            method: "POST",
            //json string
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        });
        //should send a json workkout we sent or the error message
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            //After added to database. update global variable 
            dispatchWorkout({ type: "CREATE_WORKOUT", payload: json });
            //clear form values 
            setTitle('')
            //setExerciseIds([])
            setExerciseIds([])
            setError(null);
            setEmptyFields([]);
            console.log("New Workout Added", json);
        }

    }
    const handleClick = (e) => {

        //ids
        setExerciseIds((prevValue) => {
            return (
                [...prevValue, e.target.value]
            )
        })


    }




    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Workout Title:</label>
            <input
                type="text" onChange={(e) => setTitle(e.target.value)}
                name="title"
                placeholder="Biceps and Triceps"
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <div className="exercises">
                <label>Add Exercises:</label>
                <select defaultValue=""
                    name={"exercise_id"}
                    className='exercise_id'
                    onChange={handleClick}
                >
                    <option value="" disabled >
                        -- Select Exercise --
                    </option>

                    {exercises && <DropDown exercises={exercises} />}

                </select>
                {exercise_id.map((obj, index) => {
                    return (<div key={index}>
                        {exercises && exercises.map((ex) => {

                            if (ex._id.toString() === obj) {
                                return (
                                    <div key={index}>

                                        <p> <strong> Load (kg): </strong>{ex.load} </p>
                                        <p> <strong> Reps: </strong>{ex.reps} </p>
                                    </div>
                                )
                            }
                        })}
                        <select defaultValue=""
                            name={"exercise_id" + index}
                            className='exercise_id'
                            onChange={handleClick}
                        >
                            <option value="" disabled >
                                -- Select Exercise --
                            </option>

                            {exercises && <DropDown ids={exercise_id} exercises={exercises} />}


                        </select>

                    </div>)

                })

                }





            </div>
            <button type="submit">
                Submit
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm;