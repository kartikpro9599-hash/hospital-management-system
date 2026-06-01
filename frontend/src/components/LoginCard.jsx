import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginCard(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginType = localStorage.getItem("loginType");
    function handleChange(e) {
        //hooks of username and password
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else { 
            setPassword(e.target.value);
        }
    }
   async function handleSubmit(e) { 
       e.preventDefault();
       //submit the data to backend
        try {
            const res = await axios.post(props.url, {
                username,
                password,
                loginType,
            });
            if (res.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", username);
                navigate("/");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    }
    return (
        <div className="container">
            <h2>Login form for {loginType}</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className= "username">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                        value={username}
                        autoComplete="username"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete ="current-password"
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>    
    )

}

export default LoginCard;