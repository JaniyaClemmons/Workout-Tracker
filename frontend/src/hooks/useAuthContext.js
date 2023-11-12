import { AuthContext } from "../context/AuthContext"; 
import { useContext } from "react";

//everytime we need exercise data we just need to call this function 
export const useAuthContext = () => {

    //value we passed into provider component 
    const context = useContext(AuthContext)

    //If outside of wrapped components, will be null 
    if(!context){
        throw Error("useAuthContext must be used inside an ExercisesContextProvider");
    }

    //user variable and dispatch function 
    return context; 
}