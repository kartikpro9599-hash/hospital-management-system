import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard.jsx";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
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
export default ProfilePage;
