import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  const backendUrl = 'http://localhost:5000';
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" //paths for ui
          element={<Home/>}
        />
        <Route
          path="/login" //login path
          element={<Login url={`${backendUrl}/login`} />} //backend url
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App