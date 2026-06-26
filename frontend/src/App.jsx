import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CreateAccPage from "./pages/CreateAccount.jsx";
import DashBoard from "./pages/DashBoard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" //paths for ui
          element={<Home/>}
        />
        <Route
          path="/login" //login path
          element={<Login />} //backend url
        />
        <Route
          path="/create-account" //login path
          element={<CreateAccPage />} //backend url
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App