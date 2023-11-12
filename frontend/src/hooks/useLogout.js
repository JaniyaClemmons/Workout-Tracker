import {useAuthContext } from "./useAuthContext";
import { useExercisesContext } from "./useExercisesContext";

//We create this hook so when a user signups we can update the AuthContext
export const useLogout = () =>{
    
    const {dispatch} = useAuthContext(); 
    //rename the functions becuase we cant have same name 
    const {dispatch: exercisesDispatch} = useExercisesContext(); 

    const logout =  () => {

        /* delete json web token in local storage  */
        localStorage.removeItem('user')

        //update auth context with email we get back (dispatch login)
        dispatch({type: 'LOGOUT' })
        exercisesDispatch({type: 'SET_EXERCISES', payload: null})


    }
    return {logout}

}