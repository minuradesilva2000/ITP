import React from 'react';

// Import the CSS file
import '../../customStyles.css';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="summary-card">
      <div className={`icon ${color} text-white`}>
        {icon}
      </div>
      <div className="summary-text">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;