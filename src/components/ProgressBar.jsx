import React from 'react';

function ProgressBar({ savedAmount, targetAmount }) {
  const percentage = Math.min(
    Math.round((savedAmount / targetAmount) * 100),
    100
  );

  const containerStyle = {
    height: '20px',
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: '50px',
    overflow: 'hidden',
    marginTop: '5px',
    position: 'relative',
  };

  const fillerStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: percentage >= 100 ? 'green' : 'teal',
    transition: 'width 0.3s ease-in-out',
  };

  const labelStyle = {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    color: '#fff',
    top: '0',
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
      <span style={labelStyle}>{percentage}%</span>
    </div>
  );
}

export default ProgressBar;
