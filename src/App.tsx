// @ts-ignore
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Components/Home/Header.js";
import MainScreen from './Components/Home/MainScreen.js';
import FreeTrial from "./Components/Trial/Trial.js"
import Signup from "./Components/Login/Signup.js"
import Login from './Components/Login/Login.js';
import UserContext from './Components/Context/UserContext.js';
import Subscribe from './Components/Payment/Subscribe.js';
import Settings from './Components/Settings/Settings.js';
import Footer from './Components/Home/Footer.js';
import Guides from './Components/Guides/Guides.js';
import Guide1 from './Components/Guides/Guide1.js';
import SavedArbs from './Components/UserArbs/SavedArbs.js';
import Guide2 from './Components/Guides/Guide2.js';
import Guide3 from './Components/Guides/Guide3.js';

function App() {
  const [username, setUsername] = useState();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('https://profitarble.onrender.com/api/username', {
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
    // @ts-ignore
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
              <Route path="/guides/cards" element={<Guide1 />} />
              <Route path="/guides/players" element={<Guide2 />} />
              <Route path="/guides/introduction" element={<Guide3 />} />
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
