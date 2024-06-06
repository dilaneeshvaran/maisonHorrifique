import React, { useEffect, useState } from 'react';
import Session from './Session';
import '../styles/switch.css';
import '../styles/home.css';

interface SessionData {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface Props {
  isLightOn: boolean; // Define the Props interface with isLightOn prop
}
function SessionsPage({ isLightOn }: Props) {

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
      document.documentElement.classList.remove('light-on');
    } else {
      document.documentElement.classList.add('light-on');
    }
  }, [isLightOn]);

  //data
  const [sessions, setSessions] = useState<SessionData[]>([]); // Explicitly define the type of sessions

  useEffect(() => {
    fetchSessionsData()
      .then(data => setSessions(data))
      .catch(error => console.error('Error fetching session data:', error));
  }, []);

  const fetchSessionsData = async () => {
    return [
      { id: 1, title: 'Escape Room 1', description: 'Description of Escape Room 1', image: 'escape_room_1.jpg' },
      { id: 2, title: 'Escape Room 2', description: 'Description of Escape Room 2', image: 'escape_room_2.jpg' },
    ];
  };

  return (
    <div className={`home-container ${isLightOn ? 'light-on' : 'light-off'}`}>
    <div className="sessions-page">
    <main>
      <h1>All Sessions</h1>
      <div className="sessions-container">
        {sessions.map(session => (
          <Session key={session.id} title={session.title} description={session.description} image={session.image} />
        ))}
      </div>
      </main>
    </div>
    </div>
  );
}

export default SessionsPage;
