import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

function CreateAccCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setcnfPassword] = useState("");
    const passwordMatch = cnfPassword.length > 0 && password.length > 0 && password === cnfPassword;
    //returns boolean data type
    const createPatient = location.pathname === "/create-account";
    const data = {
        username,
        password,
        ...(createPatient && { cnfPassword }),
    }
    function handleChange(e) {
        //hooks of username and password
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "cnfPassword") {
            setcnfPassword(value);
        }
    }
    function handleCancel() {
        //create new account using value
        setUsername("");
        setPassword("");
        setcnfPassword("");
        navigate("/login");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //prevent submit without match 
        if (createPatient && !passwordMatch) {
            alert("Passwords do not match");
            return;
        }
        //submit the data to backend
        try {
            const req = await api.post(("/create-account"), data);
            if (req.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", username);
                navigate("/profile");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    }
    return (
        <div className="container">
            <h2>Create account for Patient</h2>

            <form onSubmit={handleSubmit} method="post">
                <div className="username">
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
                        autoComplete="new-password"
                        value={password}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="password">
                    <label htmlFor="cnfPassword">Confirm Password</label>
                    <input
                        id="cnfPassword"
                        type="password"
                        name="cnfPassword"
                        placeholder="Enter your password"
                        value={cnfPassword}
                        autoComplete="new-password"
                        required
                        onChange={handleChange}
                    />
                </div>
                {createPatient && cnfPassword.length > 0 && (passwordMatch ? <p>password match</p> : <p>password does not match</p>)}
                <button type="submit">submit</button>
                <button type="button" onClick={handleCancel}>cancel</button>
            </form>
        </div>
    )

}

export default CreateAccCard;