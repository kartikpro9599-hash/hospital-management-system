import { useNavigate } from "react-router-dom";

function Home() {
    const isLogin = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const loginType = localStorage.getItem("loginType")
    function handleLogOut() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("loginType");
        navigate("/");
    }
    function handleLogin(role) {
        localStorage.setItem("loginType", role);//use local storage to check who is going to login
        navigate("/login");
    }

    return ( <> 
        {isLogin ? //conditional login type check
            (
                <>
                    <h1>We care About Your Health</h1>
                    <h2>welcome {loginType} {username}</h2>
                    <button onClick={handleLogOut}>LogOut</button>
                </>
            ) : (
                <>
                    <h1>Please do login</h1>
                    <button onClick={() => handleLogin("patient")}>Login as a Patient</button>
                    <button onClick={() => handleLogin("doctor")}>Login as a Doctor</button>
                    <button onClick={() => handleLogin("admin")}>Login as an Admin</button>
                </>
            )
    }
    </>
    )
}
export default Home;