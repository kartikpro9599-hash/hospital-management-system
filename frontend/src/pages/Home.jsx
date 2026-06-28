import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    function handleLogin(role) {
        localStorage.setItem("loginType", role);//use local storage to check who is going to login
        navigate("/login");
    }

    return (             
        <>
                    <h1>Please do login</h1>
                    <button onClick={() => handleLogin("patient")}>Login as a Patient</button>
                    <button onClick={() => handleLogin("doctor")}>Login as a Doctor</button>
                    <button onClick={() => handleLogin("admin")}>Login as an Admin</button>
        </>
    )
}
export default Home;