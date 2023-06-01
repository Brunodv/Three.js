import React from 'react';

function Matrix({ name, rows }) {
  return (
    <div>
      <h1>{name}</h1>
      <div className="matrix">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <span key={colIndex}>{value}{colIndex !== row.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matrix;
