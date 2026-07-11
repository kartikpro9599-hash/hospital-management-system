import { useNavigate } from "react-router-dom";

function Back() {
    const navigate = useNavigate();
    function handleBack() {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/dashboard");
        }
    }
    return (
        < button type="button" name="back" id="back" onClick={handleBack} >Back</button >
    )
}
export default Back;