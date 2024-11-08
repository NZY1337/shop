import { useState,  } from 'react'
import './App.css'
import { useUser } from './context/UserContext'
import axiosInstance from './utils/axiosInstance';

function App() {
  const [count, setCount] = useState(0);
  const { loginUser, user, logoutUser } = useUser();

  
  const fetchData = async () => {
    try {
      const response = await axiosInstance.post('/auth/signUp', {
        name: "Andrei Mocanu",
        email: "mandreicosmin@yahoo.com",
        password: "secret",
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   
  

  return (
    <>
      <div>
        {!user && <button onClick={() => loginUser({ password: 'secret', email: 'mandreicosmin@yahoo.com' })}>
            Log In
        </button>}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
        <button onClick={fetchData}>Register</button>

        {user ? <p>Welcome, {user?.name}</p> : <p>Please log in</p>}

        {user && <button onClick={logoutUser}>LogOut</button>}

      </div>
      
    </>
  )
}

export default App
