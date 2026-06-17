import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = localStorage.getItem("isLoggedIn") === "true";
        if (!isLogin) {
            navigate("/")
        }
    }, [navigate])
    return (
        <ProfileCard />
    )
}
export default Profile;