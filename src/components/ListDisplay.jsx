import React from 'react';

function ListDisplay({ title, items, renderItem, emptyMessage }) {
  return (
    <div className="list-container">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <em>{emptyMessage}</em>
      ) : (
        items.map((item, index) => (
          <div key={index} className="list-item">
            {renderItem(item)}
          </div>
        ))
      )}
    </div>
  );
}

export default ListDisplay;
