import { Navigate } from "react-router-dom";
import api from "../api/api.js";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const checkingUser = async () => {
            try {
                const req = await api.get("/api/me");
                if (req.data.success) {
                    setAuth(true)
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.log("user is not signed in", error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };
        checkingUser();
    }, [])
    if (loading) {
        //search for spinner animation
        return (<div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <HashLoader />
        </div>
        );
    }
    if (!auth) {
        <Navigate to="/" replace />
    }

    return children;
}
export default ProtectedRoute;