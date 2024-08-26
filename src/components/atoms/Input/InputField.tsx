import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder = '',
  error = false,
  disabled = false,
  label,
}) => {
  const className = `${styles.input} ${error ? styles.error : ''}`;

  return (
    <div className={styles.inputContainer}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default InputField;
