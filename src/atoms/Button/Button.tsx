import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode | string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
