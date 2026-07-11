import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./routes/AuthProvider.jsx";
import { PublicOnlyRoute } from "./routes/PublicRoute.jsx";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";


import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CreateAccPage from "./pages/patient-pages/CreateAccount.jsx";
import DashBoard from "./pages/patient-pages/DashBoard.jsx";
import BookedAppointment from "./pages/patient-pages/BookedAppointment.jsx";
import ProfilePage from "./pages/patient-pages/ProfilePage.jsx";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<PublicOnlyRoute />}>
            <Route path="/login/:loginType" element={<Login />} />
            <Route path="/create-account" element={<CreateAccPage />} />
          </Route>

          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/booked" element={<BookedAppointment />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider >
  )
}

export default App