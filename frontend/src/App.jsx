import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const backendUrl = 'http://localhost:5000/patients';

  const [backendData,setBackendData] = useState("");
  useEffect(() => {

    axios.get(backendUrl)
      .then((res) => {
        console.log(res.data);
        setBackendData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <h1>{backendData}</h1>
  )
}

export default App