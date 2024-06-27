import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SessionsPage from './components/SessionsPage';
import Contact from './components/Contact';
import Login from './components/Login';
import SessionManagement from './components/SessionManagement';

import './App.css';
import AccountManagement from './components/AccountManagement';
import Management from './components/Management';

const App: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const handleLightSwitch = () => {
    setIsLightOn(prevState => !prevState);
  };

  const handleUserLogin=() =>{
    setIsUserLoggedIn(prevState=>!prevState);
  }

  const handleLogout=()=>{
    setIsUserLoggedIn(false);
    navigate('/login');
  }


  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.remove('light-on');
    } else {
      document.documentElement.classList.add('light-on');
    }
  }, [isLightOn]);

  return (
    <div className={`app-container ${isLightOn ? 'light-on' : 'light-off'}`}>
      <Navbar isUserLoggedIn={isUserLoggedIn} isLightOn={isLightOn} handleLightSwitch={handleLightSwitch} />
      <Routes>
        <Route
          path="/"
          element={<Home isLightOn={isLightOn} />}
        />
        <Route path="/sessions" element={<SessionsPage isLightOn={isLightOn} />} />
        <Route path="/contact" element={<Contact isLightOn={isLightOn} />} />
        <Route path="/login" element={<Login handleUserLogin={handleUserLogin} isLightOn={isLightOn} />} />
        <Route path="/session-management" element={<SessionManagement/>} />
        <Route path="/account-management" element={<AccountManagement/>} />
        <Route path="/management" element={<Management handleLogout={handleLogout}/>} />
      </Routes>
    </div>
  );
}

export default App;
