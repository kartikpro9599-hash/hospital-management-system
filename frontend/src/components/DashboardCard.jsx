import LogOut from "../components/sub-components/LogoutBtn.sub.jsx"
import { useNavigate } from "react-router-dom";


function DashBoardCard() {
    const navigate = useNavigate();
    function HandleNavigate(e) {
        navigate(`/${e.target.name}`)
    }
    return (
        <div>
            <button type="button" name="Profile" id="profile" onClick={HandleNavigate}>Profile</button>
            <LogOut />

            <br />
            <br />
            <button type="button" name="book-new" className="dashboard-btns" onClick={HandleNavigate}>Book New Appointment</button>
            <button type="button" name="continue-appointment" className="dashboard-btns" onClick={HandleNavigate}>Continue with past Appointment</button>

            <br />
            <br />
            <button type="button" name="booked" className="dashboard-btns" onClick={HandleNavigate}>Booked Appointment</button>
            <button type="button" name="services" className="dashboard-btns" onClick={HandleNavigate}>Book your Services</button>

        </div>
    );
}

export default DashBoardCard;