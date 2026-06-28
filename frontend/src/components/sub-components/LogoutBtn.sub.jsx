import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("loginType");
        localStorage.removeItem("createPatient");
        navigate("/");
    }
    return (
        < button type="button" name="logout" id="logout" onClick={handleLogOut} > LogOut</button >
    )

}
export default LogOut;