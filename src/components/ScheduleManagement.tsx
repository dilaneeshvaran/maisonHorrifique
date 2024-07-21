import React, { useState } from 'react';
import '../styles/session-management.css';
import { RiCalendarScheduleFill } from "react-icons/ri";

interface Schedule {
    id: number;
    name: string;
    people: number;
    time: string;
}

const fakeSchedules: Schedule[] = [
    {
        id: 1,
        name: "Psycho Vampire",
        people: 5,
        time: "2024-07-22T14:00:00"
    },
    {
        id: 2,
        name: "Chambre de Valak",
        people: 4,
        time: "2024-07-22T16:00:00"
    },
    {
        id: 3,
        name: "Psycho Vampire",
        people: 6,
        time: "2024-07-23T18:00:00"
    }
];

const ScheduleManagement: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>(fakeSchedules);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [scheduleToCancel, setScheduleToCancel] = useState<Schedule | null>(null);

    const handleCancelSchedule = (schedule: Schedule) => {
        setScheduleToCancel(schedule);
    };

    const confirmCancelSchedule = () => {
        if (scheduleToCancel) {
            setSchedules(schedules.filter(schedule => schedule.id !== scheduleToCancel.id));
            setScheduleToCancel(null);
        }
    };

    const closeScheduleModal = () => {
        setIsScheduleModalOpen(false);
        setScheduleToCancel(null);
    };

    return (
        <>
            <div className='main-schedule-container'>
                <RiCalendarScheduleFill onClick={() => setIsScheduleModalOpen(true)} className='open-schedule-modal-btn' />
                {isScheduleModalOpen && (
                    <div className="modal-acc">
                        <div className="modal-content">
                            <span className="close-acc" onClick={closeScheduleModal}>&times;</span>
                            <h2>Calendrier Session</h2>
                            <ul className="schedule-list">
                                {schedules.map((schedule) => (
                                    <li key={schedule.id} className="schedule-item">
                                        <div className="schedule-details">
                                            <h3>{schedule.name}</h3>
                                            <p>Personnes: {schedule.people}</p>
                                            <p>Date: {new Date(schedule.time).toLocaleString()}</p>
                                        </div>
                                        <button className="cancel-btn" onClick={() => handleCancelSchedule(schedule)}>Annuler le schedule</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {scheduleToCancel && (
                    <div className="modal-acc">
                        <div className="modal-content">
                            <span className="close-acc" onClick={closeScheduleModal}>&times;</span>
                            <h2>Confirmer</h2>
                            <p>Etes vous sur d'annuler le schedule {scheduleToCancel.name}?</p>
                            <button className="confirm-btn" onClick={confirmCancelSchedule}>Oui</button>
                            <button className="cancel-btn" onClick={closeScheduleModal}>Non</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScheduleManagement;
