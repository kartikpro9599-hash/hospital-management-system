import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/useAuth.js";
import api from "../../api/api.js"

function LogOut() {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    async function handleLogOut() {

        const req = await api.get('/api/logout');
        if (req.data.success) {
            setUser(null);
            setToken(null);
            navigate("/");
        }
    }
    return (
        < button type="button" name="logout" id="logout" onClick={handleLogOut} > LogOut</button >
    )

}
export default LogOut;