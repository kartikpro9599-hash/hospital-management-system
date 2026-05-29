import Login from "../src/pages/Login";

function App() {
  const backendUrl = 'http://localhost:5000';

  return (
    <Login url={`${backendUrl}/patients/submit-data`} />
  )
}

export default App