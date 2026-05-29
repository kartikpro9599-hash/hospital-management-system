import { useState } from "react";
import axios from "axios";

function LoginCard(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    function handleChange(e) {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else { 
            setPassword(e.target.value);
        }
    }
   async function handleSubmit(e) { 
        e.preventDefault();
        try {
            const res = await axios.post(props.url, {
                username,
                password,
            });
            setStatus(res.data.message);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div class="container">
            <h1>{props.head}</h1>
            <form onSubmit={handleSubmit} method="post">
                <div class= "username">
                    <label for="name">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                        value={username}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div class="password">
                    <label for="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>
            <button type="submit">submit</button>
            </form>
            <p>{status}</p>
        </div>    
    )

}

export default LoginCard;