import React from 'react';

const Legend = () => {
  const legendItems = [
    { color: '#eb7f7f', label: 'ALP' },
    { color: '#78aede', label: 'LPA' },
    { color: '#cedb85', label: 'GPA' },
    { color: '#ff8000', label: 'NPA' },
  ];

  return (
    <div className="legend">
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          <div className="color-box" style={{ backgroundColor: item.color, height: '5px'}}></div>
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
