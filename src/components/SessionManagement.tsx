import React, { useState } from 'react';
import '../styles/session-management.css';
import { FaPlus } from "react-icons/fa";
import ScheduleManagement from './ScheduleManagement';

interface Session {
    title: string;
    description: string;
    duration: number;
    capacity: number;
    price: number;
    schedules: string;
    image?: string;
}

const SessionManagement: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSession, setNewSession] = useState<Partial<Session>>({});
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewSession({ ...newSession, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewSession({ ...newSession, image: URL.createObjectURL(file) });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleCreateSession = (e: React.FormEvent) => {
        e.preventDefault();
        setSessions([...sessions, newSession as Session]);
        setIsModalOpen(false);
        setNewSession({});
        setPreviewImage(null);
    };

    const handleUpdateSession = (e: React.FormEvent) => {
        e.preventDefault();
        setSessions(sessions.map(session => session.title === newSession.title ? newSession as Session : session));
        setIsEditing(false);
        setIsModalOpen(false);
        setNewSession({});
        setPreviewImage(null);
    };

    const handleEditSession = (session: Session) => {
        setSelectedSession(null);
        setNewSession(session);
        setIsModalOpen(true);
        setIsEditing(true);
        setPreviewImage(session.image || null);
    };

    const handleDeleteSession = (title: string | null) => {
        if (title) {
            setSessions(sessions.filter(session => session.title !== title));
            setSelectedSession(null);
        }
    };

    const openSessionDetails = (session: Session) => {
        setSelectedSession(session);
    };

    const closeSessionDetails = () => {
        setSelectedSession(null);
    };

    return (
        <>
            <div className='main-session-container'>
                <div className='session-header'>
                    <FaPlus className='create-session-btn' onClick={() => { setIsModalOpen(true); setIsEditing(false); setNewSession({}); setPreviewImage(null); }} />
                    <h2 className='h2-s'>Sessions</h2>
                    <div className='schedule-calendar'><ScheduleManagement /></div>
                </div>
                <div className="s-management-container">
                    <div id="sessionList" className="session-list">
                        {sessions.map((session) => (
                            <div key={session.title} className="session">
                                <h3 onClick={() => openSessionDetails(session)}>{session.title}</h3>
                                {session.image && <img src={session.image} alt={session.title} className="session-image-preview" />}
                            </div>
                        ))}
                    </div>
                    {isModalOpen && (
                        <div id="sessionModal" className="modal">
                            <div className="modal-content">
                                <span className="close-session" onClick={() => setIsModalOpen(false)}>&times;</span>
                                <h2>{isEditing ? 'Modifier la Session' : 'Créer une Session'}</h2>
                                <form className='form-session' onSubmit={isEditing ? handleUpdateSession : handleCreateSession}>
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
                                    <label htmlFor="image">Image:</label>
                                    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                    {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}
                                    <button className='session-validate' type="submit">{isEditing ? 'Modifier' : 'Créer'}</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {selectedSession && (
                        <div id="sessionDetailsModal" className="modal">
                            <div className="modal-content">
                                <span className="close-session" onClick={closeSessionDetails}>&times;</span>
                                <h2>{selectedSession.title}</h2>
                                {selectedSession.image && <img src={selectedSession.image} alt={selectedSession.title} className="image-preview" />}
                                <p>{selectedSession.description}</p>
                                <p>Durée: {selectedSession.duration} minutes</p>
                                <p>Capacité Max: {selectedSession.capacity}</p>
                                <p>Prix: ${selectedSession.price}</p>
                                <p>Créneau: {selectedSession.schedules}</p>
                                <button className='session-dlt' onClick={() => {
                                    setSessionToDelete(selectedSession.title);
                                    setIsConfirmDialogOpen(true);
                                }}>Détruire</button>
                                <button className='session-edit' onClick={() => handleEditSession(selectedSession)}>Modifier</button>
                            </div>
                        </div>
                    )}
                </div>

                {isConfirmDialogOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Etes vous sur de détruire le room ?</p>
                            <button onClick={() => {
                                handleDeleteSession(sessionToDelete);
                                setIsConfirmDialogOpen(false);
                            }}>Oui</button>
                            <button onClick={() => setIsConfirmDialogOpen(false)}>Non</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SessionManagement;
