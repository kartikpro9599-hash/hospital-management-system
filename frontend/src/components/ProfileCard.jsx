import LogOut from "../components/sub-components/LogoutBtn.sub.jsx"
function ProfileCard() {
    const username = localStorage.getItem("username");
    const loginType = localStorage.getItem("loginType");

    return (
        <div>
            <h2>welcome {loginType} {username}</h2>
            <LogOut />
        </div>
    );
}
export default ProfileCard;