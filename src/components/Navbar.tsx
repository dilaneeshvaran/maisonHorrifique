import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import '../styles/switch.css';
import '../styles/home.css';

interface Props {
  isLightOn: boolean;
  handleLightSwitch: () => void;
}

const Navbar: React.FC<Props> = ({ isLightOn, handleLightSwitch }) => {
  useEffect(() => {
    const update = (e: MouseEvent | TouchEvent) => {
      const x = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
      const y = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
      
      document.documentElement.style.setProperty('--cursorX', `${x}px`);
      document.documentElement.style.setProperty('--cursorY', `${y}px`);
    };

    document.addEventListener('mousemove', update);
    document.addEventListener('touchmove', update);

    return () => {
      document.removeEventListener('mousemove', update);
      document.removeEventListener('touchmove', update);
    };
  }, []);

  useEffect(() => {
    if (isLightOn) {
      document.documentElement.classList.add('light-on');
    } else {
      document.documentElement.classList.remove('light-on');
    }
  }, [isLightOn]);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sessions">Sessions</Link></li>
      </ul>
      <div className='switch-container'>
        <input type="checkbox" id="light-switch" onChange={handleLightSwitch} checked={isLightOn} />
        <label htmlFor="light-switch" id="light-switch-label">
          <div className="screw"></div>
          <div className="switch"></div>
          <div className="screw"></div>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
