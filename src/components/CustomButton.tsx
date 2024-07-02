import React from 'react';
import classNames from 'classnames';

interface CustomButtonProps {
  onClick: () => void;
  children: string,
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, className }) => {
  return (
    <>
    <button
      onClick={onClick}
      className={classNames(
        'py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none',
        className
      )}
    >
      {children}
    </button>
    </>
  );
};

export default CustomButton;
