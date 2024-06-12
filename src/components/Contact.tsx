import React, { useEffect } from 'react';
import '../styles/contact.css';

interface Props {
  isLightOn: boolean;
}

const Contact: React.FC<Props> = ({ isLightOn }) => {
    useEffect(() => {
        if (isLightOn) {
          document.documentElement.classList.remove('light-on');
        } else {
          document.documentElement.classList.add('light-on');
        }
      }, [isLightOn]);

  return (
    <div className="page-container">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form>
          <label>Name:
            <input type="text" name="name" required />
          </label>
          <label>Email:
            <input type="email" name="email" required />
          </label>
          <label>Message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
  );
};

export default Contact;
