import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccPage from "./pages/CreateAccount";
import Profile from "./pages/Profile";

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
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App