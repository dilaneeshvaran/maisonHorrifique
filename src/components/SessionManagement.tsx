import React, { useState } from 'react';
import '../styles/session-management.css';

interface Session {
    title: string;
    description: string;
    duration: number;
    capacity: number;
    price: number;
    schedules: string;
}

const SessionManagement: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSession, setNewSession] = useState<Partial<Session>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewSession({ ...newSession, [name]: value });
    };

    const handleCreateSession = (e: React.FormEvent) => {
        e.preventDefault();
        setSessions([...sessions, newSession as Session]);
        setIsModalOpen(false);
        setNewSession({});
    };

    const handleDeleteSession = (title: string) => {
        setSessions(sessions.filter(session => session.title !== title));
    };

    return (
        <div className="s-management-container">
            <h2>Session Management</h2>
            <div id="sessionList">
                {sessions.map((session) => (
                    <div key={session.title} className="session">
                        <h3>{session.title}</h3>
                        <p>{session.description}</p>
                        <p>Durée: {session.duration} minutes</p>
                        <p>Capacité Max: {session.capacity}</p>
                        <p>Prix: ${session.price}</p>
                        <p>Créneau: {session.schedules}</p>
                        <button className='session-dlt' onClick={() => handleDeleteSession(session.title)}>Détruire</button>
                    </div>
                ))}
            </div>
            <button className='create-session-btn' onClick={() => setIsModalOpen(true)}>Créer une Nouvelle Session</button>

            {isModalOpen && (
                <div id="sessionModal" className="modal">
                    <div className="modal-content">
                        <span className="close-session" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Créer une Session</h2>
                        <form className='form-session' onSubmit={handleCreateSession}>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" value={newSession.title || ''} onChange={handleChange} required />
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={newSession.description || ''} onChange={handleChange} required />
                            <label htmlFor="duration">Durée (minutes):</label>
                            <input type="number" id="duration" name="duration" value={newSession.duration || ''} onChange={handleChange} required />
                            <label htmlFor="capacity">Capacité Max:</label>
                            <input type="number" id="capacity" name="capacity" value={newSession.capacity || ''} onChange={handleChange} required />
                            <label htmlFor="price">Prix ($):</label>
                            <input type="number" id="price" name="price" value={newSession.price || ''} onChange={handleChange} required />
                            <label htmlFor="schedules">Créneau Disponibles:</label>
                            <input type="datetime-local" id="schedules" name="schedules" value={newSession.schedules || ''} onChange={handleChange} placeholder="e.g., Mon-Fri 10am-8pm" required />
                            <button className='session-validate' type="submit">Créer</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionManagement;
