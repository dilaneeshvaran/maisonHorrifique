import React from 'react';
import '../styles/footer.css';
import facebookLogo from '../assets/fb.png';
import twitterLogo from '../assets/x.png';
import instagramLogo from '../assets/insta.png';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="haunted-footer">
        <p>© 1800 Maison Horifique. All rights reserved.</p>

        <div className='mentions-legales'>
            <Link to="/mentions-legales">Mentions Légales</Link>
        </div>

        <div className='social-media'>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src={instagramLogo} alt="Instagram" />
            </a>
        </div>
    </footer>
);

export default Footer;