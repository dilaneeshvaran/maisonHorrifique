import React from 'react';

interface SessionProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

function Session({ title, description, image, onClick }: SessionProps) {
  return (
    <div className="session" onClick={onClick}>
      <img src={image} alt={title} className="session-image" />
      <div className="session-details">
        <h2 className="session-title">{title}</h2>
        <p className="session-description">{description}</p>
      </div>
    </div>
  );
}

export default Session;
