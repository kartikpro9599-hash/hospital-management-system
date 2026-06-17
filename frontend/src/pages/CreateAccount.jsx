import { Navigate } from "react-router-dom";
import CreateAccCard from "../components/CreateAccountCard";

function CreateAccPage() {
    const isLogIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLogIn) {
        return <Navigate to="/profile" replace />
    }
    return (
        <div>
            <CreateAccCard />
        </div>
    );
}
export default CreateAccPage;