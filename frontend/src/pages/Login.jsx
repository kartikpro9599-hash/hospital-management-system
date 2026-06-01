import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLogin from "../components/LoginCard"

function Login(props) {
    const navigate = useNavigate();

    useEffect(() => { //remove direct access of /login route for role set 
        const loginType = localStorage.getItem("loginType");
        if (!loginType) {
            navigate("/", { replace: true });
        }
    }, [navigate]);
    return <UserLogin url={props.url} />;
}

export default Login;