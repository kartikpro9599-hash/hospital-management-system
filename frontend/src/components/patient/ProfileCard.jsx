function ProfileCard() {
    const username = localStorage.getItem("username");
    const loginType = localStorage.getItem("loginType");

    return (
        <div>
            <h2>welcome {loginType} {username}</h2>
        </div>
    );
}
export default ProfileCard;