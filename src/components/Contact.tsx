import React, { useEffect, useState } from 'react';
import '../styles/contact.css';

interface Props {
  isLightOn: boolean;
}

const Contact: React.FC<Props> = ({ isLightOn }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setDialogVisible(true);
  };

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
        <h2>Contactez la maison</h2>
        <form onSubmit={handleSubmit}>
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
        {isDialogVisible && (
          <div className="haunted-dialog">
            <p>Lettre déposé</p>
            <button onClick={() => setDialogVisible(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;