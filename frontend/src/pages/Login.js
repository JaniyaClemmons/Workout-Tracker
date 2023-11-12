import { useState } from "react";
import { useLogin } from "../hooks/useLogin";



const Login = () => {

    const { login, isLoading, error } = useLogin()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [emptyFields, setEmptyFields] = useState([])


    const handleChange = (event) => {
        //console.log(event.target.value);
        const { name, value } = event.target;
        setUser(prevValue => {
            return ({ ...prevValue, [name]: value })
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(user.email, user.password);
        //console.log(user);

    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login: </h3>

            <label> Email:</label>
            <input
                type="email" onChange={handleChange}
                name="email"
                placeholder="Email"
                value={user.email}
                className={emptyFields.includes('email') ? 'error' : ''}
            />
            <label> password:</label>
            <input
                type="password" onChange={handleChange}
                name="password"
                placeholder="Password"
                value={user.password}
                className={emptyFields.includes('password') ? 'error' : ''}
            />
            <button disabled={isLoading} type="submit">
                Login
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )


}
export default Login;