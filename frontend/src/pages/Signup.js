import { useState} from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

const [user, setUser] = useState({
    email: "",
    password: ""
})
const {signup, error, isLoading } = useSignup()

const [emptyFields ,setEmptyFields] = useState([])



const handleChange = (event) => {
    const {name, value} = event.target;
    setUser(prevValue => {
        return ({...prevValue, [name]: value })
    })
} 
const handleSubmit = async (event) => {
    event.preventDefault();

    //console.log(user); 
    await signup(user.email, user.password)

}


return (
    <form className = "signup" onSubmit={handleSubmit}>
        <h3>Signup: </h3>

        <label> Email:</label>
            <input 
                type = "email" onChange = {handleChange} 
                name = "email"
                placeholder = "Email"
                value = {user.email}
                className = {emptyFields.includes('email')? 'error': ''}
            />
        <label> Password:</label>
            <input 
                type = "password" onChange = {handleChange} 
                name = "password"
                placeholder = "Password"
                value = {user.password}
                className = {emptyFields.includes('password')? 'error': ''}
            />
        <button type = "submit" disabled = {isLoading}>
                Signup
            </button>
            {error && <div className="error">{error}</div>}
    </form>
)


}

export default Signup;