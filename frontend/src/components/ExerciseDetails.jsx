//date fns npm install date-fns to format dates
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useAuthContext } from "../hooks/useAuthContext"
import {useState} from "react";




const ExerciseDetails = ({exercise, dispatch}) => {

    const {title, reps, load, sets, createdAt, _id} = exercise;

    const { user } = useAuthContext(); 

    const [editing, setEditing] = useState(false);
    const [newExercise, setNewExercise] = useState({...exercise});
    


    let viewMode = {};
    let editMode = {};
    if (editing) {
        viewMode.display = 'none';
    } else {
        editMode.display = 'none';
    }

  
    
    const handleEdit = () => {
        setEditing(true);

    }

    function handleChange(event){
        
        const {name, value} = event.target;
        setNewExercise(prevValue => {
            return ({...prevValue, [name]: value })
        }); 
    } 
    const handleSubmit = async (e) => {
         e.preventDefault();
        if(!user){
            return; 
        }
       
        const response = await fetch(`/api/exercises/${_id}`, 
        {
            method: "PUT",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }           
        })
        //should send a json workkout we sent or the error message
        const json = await response.json();
        if(!response.ok){
            setEditing(false);
            
        }
        if(response.ok){
            //After added to database. update global variable 
            dispatch({type: "UPDATE_EXERCISE", payload: json}); 
            exercise = {
                ...json
            };
            setEditing(false);         
        }

    }

    const handleDelete = async (e) => {
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
        }

    }
    
   
    

    return (
       
       <>
        <div style={viewMode}  className = "exercise-details">
        
            <h4>{title}</h4>
            <p> <strong> Load (kg): </strong>{load} </p>
            <p> <strong> Reps: </strong>{reps} </p>
            <p> <strong> Sets: </strong>{sets} </p>
            <p>
            
                {createdAt && formatDistanceToNow(new Date(createdAt), {addSuffix: true})}
            </p>
            <span className="material-symbols-outlined edit" value={exercise} onClick={handleEdit}>edit</span>
           
           
           <span className="material-symbols-outlined" value={exercise} onClick={handleDelete}>delete</span> 
            
           
        </div>
        <div style={editMode}>
        <form  className = "create" onSubmit = {handleSubmit}>
            <h3>Edit Exercise</h3>

            <label>Exercise Title:</label>
            <input 
                type = "text" onChange = {handleChange} 
                name = "title"
                placeholder = {exercise.title}
                value = {newExercise.title}
                
            />
            <label>Number of Reps:</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "reps"
                placeholder = {exercise.reps}  
                value = {newExercise.reps}  
                                 
            />
            <label>Load (in kg):</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "load"
                placeholder = {exercise.load}
                value = {newExercise.load}
                
            />
            <label>Sets:</label>
            <input 
                type = "number" 
                onChange = {handleChange} 
                name = "sets"
                placeholder = {exercise.sets}
                value = {newExercise.sets}
                
            />
            <button type = "submit">
                Submit
            </button>
            
        </form>
        </div>
        
       
        </>
    )
}

export default ExerciseDetails