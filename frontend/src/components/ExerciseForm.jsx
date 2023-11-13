import {useState} from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ExerciseForm = () =>{
    //Allows us to update the global context variable
    const {dispatch} = useExercisesContext();

    const {user} = useAuthContext(); 

    const [exercise, setExercise] = useState({
        title: "",
        reps: "",
        load: "",
        sets: ""
    })

    const [emptyFields ,setEmptyFields] = useState([])

    const [error, setError] = useState(null);


    function handleChange(event){
        //console.log(event.target.value);
        const {name, value} = event.target;
        setExercise(prevValue => {
            return ({...prevValue, [name]: value })
        }); 
    } 

    /*function handleSubmit(event){
        event.preventDefault(); 
        console.log(event.target);
    }*/
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        if(!user){
            setError('You must be logged in');
            return;
        }

        //fetch api to send post request 
        //arg 2 is a req object with method, body, and headers
        const response = await fetch("/api/exercises/", {
            method: "POST",
            //json string
            body: JSON.stringify(exercise),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        });
        //should send a json workkout we sent or the error message
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //After added to database. update global variable 
            dispatch({type: "CREATE_EXERCISE", payload: json}); 
            //clear form values 
            setExercise({
                title: "",
                reps: "",
                load: "",
                sets: ""
            });
            setError(null);
            setEmptyFields([]);
            console.log("New Exercise Added" , json);
        }

    }
    

    return(
        <form className = "create" onSubmit = {handleSubmit}>
            <h3>Add a New Exercise</h3>

            <label>Exercise Title:</label>
            <input 
                type = "text" onChange = {handleChange} 
                name = "title"
                placeholder = "Dumbbell Curls"
                value = {exercise.title}
                className = {emptyFields.includes('title')? 'error': ''}
            />
            <label>Number of Reps:</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "reps"
                placeholder = "10"
                value = {exercise.reps}  
                className = {emptyFields.includes('reps')?  'error': ''}                  
            />
            <label>Load (in kg):</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "load"
                placeholder = "20"
                value = {exercise.load}
                className = {emptyFields.includes('load')? 'error': ''}
            />
            <label>Sets:</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "sets"
                placeholder = "3"
                value = {exercise.sets}
                className = {emptyFields.includes('sets')? 'error': ''}
            />
            <button type = "submit">
                Submit
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default ExerciseForm;