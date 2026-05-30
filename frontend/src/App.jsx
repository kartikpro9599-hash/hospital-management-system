import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  const backendUrl = 'http://localhost:5000';
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/login"
          element={<Login url={`${backendUrl}/patients/submit-data`} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App