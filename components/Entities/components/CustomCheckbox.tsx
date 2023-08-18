import React from 'react';

interface IProps {
  isChecked?: boolean;
  onClick: () => void;
}

const CustomCheckbox = ({ isChecked, onClick }: IProps) => {
  return (
    <div
      className="flex cursor-pointer justify-center items-center w-6 h-6 border-2 border-white rounded p-0.4"
      onClick={onClick}
    >
      {isChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
