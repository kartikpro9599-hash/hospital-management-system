import { useNavigate } from "react-router-dom";

function Home() {
    const isLogin = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        navigate("/");
    }
    return ( <> 
            {isLogin  ?
            (
                <>
                    <h1>We care About Your Health</h1>
                    <h2>welcome {username}</h2>
                    <button onClick={handleLogOut}>LogOut</button>
                </>
            ) : (
                <>
                    <h1>Please do login</h1>
                    <button onClick={() => navigate("/login")}>Login</button>
                </>
            )
    }
    </>
    )
}
export default Home;