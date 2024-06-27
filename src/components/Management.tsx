import React, { useState } from 'react';
import SessionManagement from './SessionManagement';
import AccountManagement from './AccountManagement';
import '../styles/management.css';

interface Props {
    handleLogout: () => void;
}

const Management: React.FC<Props> = ({ handleLogout }) => {
    const [activeTab, setActiveTab] = useState('sessions');

    const renderContent = () => {
        switch (activeTab) {
            case 'sessions':
                return <SessionManagement />;
            case 'account':
                return <AccountManagement />;
            default:
                return <SessionManagement />;
        }
    };

    return (
        <div className="management-container">
            <div className="management-nav">
                <button
                    className={`nav-button ${activeTab === 'sessions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sessions')}
                >
                    Gestion des Sessions
                </button>
                <button
                    className={`nav-button ${activeTab === 'account' ? 'active' : ''}`}
                    onClick={() => setActiveTab('account')}
                >
                    Gestion de Mon Compte
                </button>
            </div>
            <div className="management-content">
                {renderContent()}
            </div>
            <button
                className={`nav-button ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => handleLogout()}
            >
                Déconnexion
            </button>
        </div>
    );
};

export default Management;
