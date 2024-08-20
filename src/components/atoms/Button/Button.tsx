import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
  children?: React.ReactNode | string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;
