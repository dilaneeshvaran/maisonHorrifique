import React, { useState } from 'react';
import styled from 'styled-components';
import Session from './Session';

interface SessionData {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ReservationProps {
  session: SessionData;
  onClose: () => void;
}

const Form = styled.form`
  position: fixed; 
  z-index: 1000; 
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

const Input = styled.input`
  background-color: #222;
  color: #fff;
  border: none;
  border-bottom: 2px solid #fff;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;
const CloseButton = styled.button`
  position: absolute; 
  top: 10px;
  right: 10px;
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

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

const Reservation: React.FC<ReservationProps> = ({ session, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsDialogOpen(true);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h1>Reserve {session.title}</h1>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Input type="date" placeholder="Reservation Date" required />
        <Input type="time" placeholder="Reservation Time" required />
        <Button type="submit">Reserve</Button>
      </Form>
      {
        isDialogOpen && (
          <DialogBox>
            <h2>Oops... Reservation confirmed!</h2>
            <button onClick={() => { setIsDialogOpen(false); onClose(); }}>Close</button>
          </DialogBox >
        )
      }
    </>
  );
};

export default Reservation;