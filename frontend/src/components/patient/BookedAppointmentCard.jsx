import { useState } from "react";

function BookedAppointmentCard() {
    const data = useState({
        appointId: "",
        otp: "",
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
    })

    return (
        <div>
            <div>
                <p>appoint-id -{data.appointId}</p><br />
                <p>otp - {data.otp}</p>
                <p>patient name- {data.patientName}</p>
                <p>doctor name - {data.doctorName}</p>
                <p>date - {data.date}</p>
                <p>time- {data.time}</p>
                <button type="button"> cancel</button>
            </div>
        </div>
    )
}
export default BookedAppointmentCard;