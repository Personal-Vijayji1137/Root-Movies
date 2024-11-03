"use client"
import { useState } from 'react';

const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
      <div style={styles.switch} onClick={toggleSwitch}>
        <div
          style={{
            ...styles.toggle,
            backgroundColor: isEnabled ? '#4CAF50' : '#ff000069',
            transform: isEnabled ? 'translateX(33px)' : 'translateX(0)',
          }}
        />
      </div>
  );
};

const styles = {
  switch: {
    width: '60px',
    height: '25px',
    backgroundColor: '#ccc',
    borderRadius: '15px',
    position: 'relative',
    cursor: 'pointer',
    padding: '2px',
  },
  toggle: {
    width: '25px',
    height: '25px',
    margin: '2px',
    borderRadius: '50%',
    position: 'absolute',
    top: '0',
    transition: '0.3s',
  },
};
export default ToggleSwitch;