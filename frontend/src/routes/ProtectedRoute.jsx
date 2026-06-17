import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isLogIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLogIn) {
        return <Navigate to="/" replace />;
    }
    return children;
}
export default ProtectedRoute;