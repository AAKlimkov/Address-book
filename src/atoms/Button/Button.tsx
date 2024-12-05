import React from 'react';
import { ComponentProps } from 'react';

import styles from './Button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'danger';
};

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
