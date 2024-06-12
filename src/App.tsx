import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SessionsPage from './components/SessionsPage';
import Contact from './components/Contact';

import './App.css';

const App: React.FC = () => {
  const [isLightOn, setIsLightOn] = useState(false);

  const handleLightSwitch = () => {
    setIsLightOn(prevState => !prevState);
  };

  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.remove('light-on');
    } else {
      document.documentElement.classList.add('light-on');
    }
  }, [isLightOn]);

  return (
    <div className={`app-container ${isLightOn ? 'light-on' : 'light-off'}`}>
      <Navbar isLightOn={isLightOn} handleLightSwitch={handleLightSwitch} />
      <Routes>
        <Route
          path="/"
          element={<Home isLightOn={isLightOn} />}
        />
        <Route path="/sessions" element={<SessionsPage isLightOn={isLightOn} />} />
        <Route path="/contact" element={<Contact isLightOn={isLightOn} />} />


      </Routes>
    </div>
  );
}

export default App;
