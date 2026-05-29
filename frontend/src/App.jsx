import Login from "../src/pages/Login";
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const backendUrl = 'http://localhost:5000';

  const [backendData,setBackendData] = useState("");
  useEffect(() => {

    axios.get(`${backendUrl}/patients`)
      .then((res) => {
        console.log(res.data);
        setBackendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <Login back={backendData} url={`${backendUrl}/patients/submit-data`} />
  )
}

export default App