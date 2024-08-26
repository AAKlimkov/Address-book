import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'danger';
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
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
