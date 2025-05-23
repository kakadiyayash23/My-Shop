import React from 'react';
import './style.css';

export const LoadingIcon = () => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-animated"
    >
      <path
        d="M12 2v4.167M12 17.833V22M22 12h-4.166M6.167 12H2M19.209 4.792l-2.917 2.917M7.708 16.292l-2.917 2.916M19.209 19.208l-2.917-2.916M7.708 7.709 4.791 4.792"
        stroke="#000000"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};
