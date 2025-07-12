import React from 'react';

const ListDisplay = ({ title, items }) => {
  return (
    <div className="dashboard-container">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListDisplay;
