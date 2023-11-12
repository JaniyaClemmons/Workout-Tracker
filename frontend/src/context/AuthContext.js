import { createContext, useReducer } from "react"; 
import { useEffect } from "react";


export const AuthContext = createContext();

//prev state before change, and action we pass into dispatch function
//Local state is a variable thats either null or logged in users, username - dispactch these actions locally 
export const authReducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            return{
                user: action.payload
            }
        case "LOGOUT":
            return{            
                user: null
            }
        
        default: 
            return state;          
    }
}

//provide context to component tree
export const AuthContextProvider = ({children}) =>{
    //we get back a state value and function to update it like useState
    //we pass in a custom reducer function and initial state value
    const [state, dispatch] = useReducer(authReducer, {user: null})
    
    //We use this to check if user in local storage on page laod 
    //arg 2 empty array to fire function once on app load
    useEffect(() => {
        //check for token in local starage - from string to obj 
        const user = JSON.parse(localStorage.getItem('user'))
        if (user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [] );

    console.log('AuthContext state: ', state)
    
    /*We wrap part of app that needs access to our context 
    (whole app - index.js App) and access them with the children prop */
    return (
        //We not only provide the exercises object but we spread the properties in it
        //so it might as well be exercises, but it would be state.exercises normally
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}