import { WorkoutsContext } from "../context/WorkoutsContext"; 
import { useContext } from "react";

//everytime we need exercise data we just need to call this function 
export const useWorkoutsContext = () => {

    //value we passed into provider component 
    const context = useContext(WorkoutsContext)

    //If outside of wrapped components, will be null 
    if(!context){
        throw Error("useWorkoutsContext must be used inside an WorkoutsContextProvider");
    }

    //dispatch function and exercise object  
    return context; 
}