import React from 'react';

export const LoadingIcon = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="loading-container">
      <svg
        className="loading-spinner"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
      <p>Loading products...</p>
    </div>
  );
};