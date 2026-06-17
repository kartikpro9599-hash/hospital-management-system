import { useNavigate } from "react-router-dom";
function ProfileCard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const loginType = localStorage.getItem("loginType")
    function handleLogOut() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("loginType");
        localStorage.removeItem("createPatient");
        navigate("/");
    }
    return (
        <div>
            <h2>welcome {loginType} {username}</h2>
            <button onClick={handleLogOut}>LogOut</button>
        </div>
    );
}
export default ProfileCard;