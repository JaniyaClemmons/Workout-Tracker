import { createContext, useReducer } from "react"; 

export const WorkoutsContext = createContext();

//prev state before change, and action we pass into dispatch function
//Local state is an array of exercises we want to be in sync w/ db, dispactch these actions locally 
export const workoutsReducer = (state, action) => {
    switch (action.type){
        case "SET_WORKOUTS":
            return{
                //The array of exercises 
                workouts: action.payload
            }
        case "SET_WORKOUT":
            return{
                //The workout object  
                workout: action.payload
            }
        case "CREATE_WORKOUT":
            return{
                /*payload would be a single workout*/
                workout: action.payload
            }
        case "DELETE_WORKOUT":
            //workout is an object, set it to null 
            return{
                workout: null
            }
        
        default: 
            return state;
           
    }
}

//provie context to component tree
export const WorkoutsContextProvider = ({children}) =>{
    //we get back a state value and function to update it like useState
    //we pass in a custom reducer function and initial state value
    const [state, dispatch] = useReducer(workoutsReducer, {workout: null})
    

    
    /*We wrap part of app that needs access to our context 
    (whole app - index.js App) and access them with the children prop */
    return (
        //We not only provide the exercises object but we spread the properties in it
        //so it might as well be exercises, but it would be state.Exercises normally
        <WorkoutsContext.Provider value = {{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}