import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import '../styles/switch.css';
import '../styles/home.css';
import Footer from './Footer';
import { RiShutDownLine } from "react-icons/ri";
import { TfiKey } from "react-icons/tfi";
import { RiCandleFill } from "react-icons/ri";

interface Props {
  isLightOn: boolean;
  handleLightSwitch: () => void;
  isUserLoggedIn: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<Props> = ({ toggleTheme, isUserLoggedIn, isLightOn, handleLightSwitch }) => {
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

  const loginRedirect = isUserLoggedIn ? '/management' : '/login';

  return (
    <>
      <nav>
        <div className='nav-container'>
          <ul>
            <li><Link to="/">Réception</Link></li>
            <li><Link to="/sessions">Réservation</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to={loginRedirect}><TfiKey className='login-btn' style={{ color: isUserLoggedIn ? 'red' : 'inherit' }} /></Link></li>
            <div className='theme-container'><RiCandleFill className='theme-btn' onClick={toggleTheme} /></div>
          </ul>
        </div>
        <div className='switch-container'>
          <input type="checkbox" id="light-switch" onChange={handleLightSwitch} checked={isLightOn} />
          <label htmlFor="light-switch" id="light-switch-label">
            <div className="screw"></div>
            <div className="switch"></div>
            <div className="screw"></div>
          </label>
        </div>
        <div>
          <Footer />
        </div>
      </nav >
    </>
  );
}

export default Navbar;
