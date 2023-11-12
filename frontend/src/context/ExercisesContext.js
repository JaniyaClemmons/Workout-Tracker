import { createContext, useReducer } from "react"; 

export const ExercisesContext = createContext();

//prev state before change, and action we pass into dispatch function
//Local state is an array of exercises we want to be in sync w/ db, dispactch these actions locally 
export const exercisesReducer = (state, action) => {
    switch (action.type){
        case "SET_EXERCISES":
            return{
                //The array of exercises 
                exercises: action.payload
            }
        case "CREATE_EXERCISE":
            return{
                /*payload would be a single exercise, so exercises is array 
                of prev exercises with new one at the front */
                exercises: [action.payload, ...state.exercises]
            }
        case "DELETE_EXERCISE":
            return{
                //array without the deleted exercise 
                exercises: state.exercises.filter((exercise) => 
                    //adds everything true to array 
                    (exercise._id !== (action.payload)._id )
                )
            }
        default: 
            return state;
           
    }
}

//provie context to component tree
export const ExercisesContextProvider = ({children}) =>{
    //we get back a state value and function to update it like useState
    //we pass in a custom reducer function and initial state value
    const [state, dispatch] = useReducer(exercisesReducer, {Exercises: null})
    
    /**DISPATCH : dispatch({type:"CREATE_Exercise", payload: [{}, {}]});
     * dispatch({type: "CREATE_Exercise", payload: json}); 
     * When we call dispatch, our reducer function invoked, 
     * passes action into function so it can update state using info and data*/ 
    

    
    /*We wrap part of app that needs access to our context 
    (whole app - index.js App) and access them with the children prop */
    return (
        //We not only provide the exercises object but we spread the properties in it
        //so it might as well be exercises, but it would be state.Exercises normally
        <ExercisesContext.Provider value = {{...state, dispatch}}>
            {children}
        </ExercisesContext.Provider>
    )
}