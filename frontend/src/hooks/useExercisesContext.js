import { ExercisesContext } from "../context/ExercisesContext"; 
import { useContext } from "react";

//everytime we need exercise data we just need to call this function 
export const useExercisesContext = () => {

    //value we passed into provider component 
    const context = useContext(ExercisesContext)

    //If outside of wrapped components, will be null 
    if(!context){
        throw Error("useExercisesContext must be used inside an ExercisesContextProvider");
    }

    //dispatch function and exercise object  
    return context; 
}