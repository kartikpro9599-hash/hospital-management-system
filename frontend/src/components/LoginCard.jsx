import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { loginAccountValidator } from "../../../shared/validator.js"

function LoginCard() {
    const navigate = useNavigate();
    const [stopSpam, setstopSpam] = useState(false);
    const initialFormValue = {
        username: "",
        password: ""
    };
    const [myForm, setMyForm] = useState(initialFormValue);
    const loginType = localStorage.getItem("loginType");

    function handleChange(e) {
        //hooks of username and password
        const { name, value } = e.target;
        setMyForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }
    function createAcc() {
        //create new account
        setMyForm(initialFormValue);
        navigate("/create-account");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            ...myForm,
            loginType,
        }
        const { error } = loginAccountValidator.safeParse(data);
        if (error) {
            console.log(error.issues)
            const errors = error.issues[0].message;
            return alert(errors)
        }
        //prevent submit without match
        //submit the data to backend
        try {
            setstopSpam(true);
            const req = await api.post(("/api/auth/login"), data);
            if (req.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", data.username);
                navigate("/dashboard");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally { setstopSpam(false); }
    }
    return (
        <div className="container">
            <h2>Login form for {loginType}</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className="username">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                        value={myForm.username}
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
                        value={myForm.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                {!stopSpam && <button type="button" onClick={() => navigate("/")}>cancel</button>}
                <button type="submit" disabled={stopSpam}>{stopSpam ? "Checking your credentials" : "submit"}</button>
                {loginType === "patient" && <button type="button" onClick={createAcc}>Create an account</button>}
            </form>
        </div>
    )

}

export default LoginCard;