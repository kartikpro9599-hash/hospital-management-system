import { Navigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

function Login() {
    const loginType = localStorage.getItem("loginType");
    const isLogIn = localStorage.getItem("isLoggedIn") === "true";

    if (!loginType) {
        return <Navigate to="/" replace />;
    }
    if (isLogIn) {
        return <Navigate to="/profile" replace />
    }

    return <LoginCard />;
}

export default Login;