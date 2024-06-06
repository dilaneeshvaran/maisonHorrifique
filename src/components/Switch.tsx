import React, { useState } from 'react';

const Switch: React.FC<{ onChange: (isChecked: boolean) => void }> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleSwitchChange} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
