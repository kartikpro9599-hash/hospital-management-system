import ProfileCard from "../../components/patient/ProfileCard.jsx";
import LogOut from "../../components/sub-components/LogoutBtn.sub.jsx";
import Back from "../../components/sub-components/BackBtn.sub.jsx";

function ProfilePage() {
    return (
        <div>
            <ProfileCard />
            <Back />
            <LogOut />
        </div>
    )
}
export default ProfilePage;
