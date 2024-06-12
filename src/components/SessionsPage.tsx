import React, { useEffect, useState } from 'react';
import Session from './Session';
import '../styles/switch.css';
import '../styles/home.css';
import '../styles/session.css';
import escape_room_1 from '../assets/escape_room_1.jpg';
import escape_room_2 from '../assets/escape_room_2.jpg';
import escape_room_3 from '../assets/escape_room_3.jpg';
import Reservation from './Reservation';

interface SessionData {
  id: number;
  title: string;
  description: string;
  image: string;
}
interface Props {
  isLightOn: boolean;
}
function SessionsPage({ isLightOn }: Props) {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = (session: SessionData) => {
    setSelectedSession(session);
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

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

  const [sessions, setSessions] = useState<SessionData[]>([]);

  useEffect(() => {
    fetchSessionsData()
      .then(data => setSessions(data))
      .catch(error => console.error('Error fetching session data:', error));
  }, []);

  const fetchSessionsData = async () => {
    return [
      { id: 1, title: 'Chambre de Valak', description: 'Say my name', image: escape_room_1 },
      { id: 2, title: 'Chambre Vampire', description: 'Will you manage to escape from the psycho vampire? ', image: escape_room_2 },
      { id: 3, title: 'Chambre n°13', description: 'Visit this room at your own risk !', image: escape_room_3 },
    ];
  };

  return (
    <div className={`home-container ${isLightOn ? 'light-on' : 'light-off'}`}>
      <div className="sessions-page">
        <main>
          <h1>All Sessions</h1>
          <div className="sessions-container">
            {sessions.map(session => (
              <Session
                key={session.id}
                title={session.title}
                description={session.description}
                image={session.image}
                onClick={() => handleOpenReservation(session)}
              />
            ))}
            {isReservationOpen && selectedSession && (
              <Reservation
                session={selectedSession}
                onClose={handleCloseReservation}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SessionsPage;
