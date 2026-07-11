import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/useAuth";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (             
        <>
            {user ? <h1>Welcome Back sir {user.fName} {user.lName}</h1> :
                <>
                    <h1>Please do login</h1>
                    <div>
                        <button onClick={() => navigate("/login/patient")}>Login as a Patient</button>
                        <button onClick={() => navigate("/login/doctor")}>Login as a Doctor</button>
                        <button onClick={() => navigate("/login/admin")}>Login as an Admin</button>
                    </div>
                </>}

        </>
    )
}
export default Home;