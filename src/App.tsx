import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Components/Home/Header.tsx";
import MainScreen from './Components/Home/MainScreen.tsx';
import FreeTrial from "./Components/Trial/Trial.tsx"
import Signup from "./Components/Login/Signup.tsx"
import Login from './Components/Login/Login.tsx';
import UserContext from './Components/Context/UserContext.tsx';
import Subscribe from './Components/Payment/Subscribe.tsx';
import Settings from './Components/Settings/Settings';
import Footer from './Components/Home/Footer.tsx';
import Guides from './Components/Guides/Guides.tsx';
import Guide1 from './Components/Guides/Guide1.tsx';
import SavedArbs from './Components/UserArbs/SavedArbs.tsx';

function App() {
  const [username, setUsername] = useState();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:3001/api/username', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setUsername(data.username);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);
  return (
    <UserContext.Provider value={{ username, setUsername, authChecked }}>
      <Router>
        <div className="App">
          <Header />
          <div className='content'>
            <Routes>
              <Route path="/" element={<MainScreen />} />
              <Route path="/freeTrial" element={<FreeTrial />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/guide1" element={<Guide1 />} />
              <Route path="/savedArbs" element={<SavedArbs></SavedArbs>} />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
