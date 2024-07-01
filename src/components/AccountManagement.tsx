import React, { useState } from 'react';
import '../styles/account-management.css';
import styled from 'styled-components';

interface AccountInfo {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    address: string;
    password: string;
    dateofbirth: string;
    gender: string;
}

const DialogBox = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  color: #fff;
  border: 2px solid #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  font-family: 'Courier New', Courier, monospace;
`;

const AccountManagement: React.FC = () => {
    const [accountInfo, setAccountInfo] = useState<Partial<AccountInfo>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isModalPwdOpen, setIsModalPwdOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAccountInfo({ ...accountInfo, [name]: value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsDialogOpen(true);
        setIsModalOpen(false);
    };

    const handleSavePwd = (e: React.FormEvent) => {
        e.preventDefault();
        setIsDialogOpen(true);
        setIsModalPwdOpen(false);
    }

    return (
        <div className="account-management-container">
            <h2>Gestion du profil</h2>
            <button onClick={() => setIsModalOpen(true)}>Modifier Mes Infos</button>
            <button onClick={() => setIsModalPwdOpen(true)}>Modifier Mon Mot de Passe</button>

            {isModalOpen && (
                <div className="modal-acc">
                    <div className="modal-content">
                        <span className="close-acc" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Modifier Mes Infos</h2>
                        <form className='form-acc' onSubmit={handleSave}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={accountInfo.email || ''} onChange={handleChange} required />

                            <label htmlFor="firstname">Nom:</label>
                            <input type="text" id="firstname" name="firstname" value={accountInfo.firstname || ''} onChange={handleChange} required />

                            <label htmlFor="lastname">Prénom:</label>
                            <input type="text" id="lastname" name="lastname" value={accountInfo.lastname || ''} onChange={handleChange} required />

                            <label htmlFor="phonenumber">Numéro Portable:</label>
                            <input type="text" id="phonenumber" name="phonenumber" value={accountInfo.phonenumber || ''} onChange={handleChange} required />

                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" value={accountInfo.address || ''} onChange={handleChange} required />

                            <label htmlFor="dateofbirth">Date de Naissance:</label>
                            <input type="date" id="dateofbirth" name="dateofbirth" value={accountInfo.dateofbirth || ''} onChange={handleChange} required />

                            <label htmlFor="gender">Genre:</label>
                            <input type="text" id="gender" name="gender" value={accountInfo.gender || ''} onChange={handleChange} required />

                            <button type="submit">Enregistrer</button>
                        </form>

                    </div>
                </div>
            )}
            {isModalPwdOpen && (
                <div className="modal-acc">
                    <div className="modal-content">
                        <span className="close-acc" onClick={() => setIsModalPwdOpen(false)}>&times;</span>
                        <h2>Modifier Mon Mot de Passe</h2>
                        <form className='form-acc' onSubmit={handleSavePwd}>
                            <label htmlFor="password">Nouveau Mot de Passe:</label>
                            <input type="password" id="password" name="password" onChange={handleChange} required />
                            <label htmlFor="password">Confirmer Nouveau Mot de Passe:</label>
                            <input type="password" id="password" name="password" onChange={handleChange} required />
                            <button type="submit">Enregistrer</button>
                        </form>

                    </div>
                </div>
            )}
            {
                isDialogOpen && (
                    <DialogBox>
                        <h2>Infos Enregistrées!</h2>
                        <button onClick={() => { setIsDialogOpen(false); }}>Fermer</button>
                    </DialogBox >
                )
            }
            {
                isDialogOpen && (
                    <DialogBox>
                        <h2>Mot de Passe Changé!</h2>
                        <button onClick={() => { setIsDialogOpen(false); }}>Fermer</button>
                    </DialogBox >
                )
            }
        </div>
    );
};

export default AccountManagement;
