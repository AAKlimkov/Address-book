import React from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  value,
  onChange,
}) => {
  return <input id={id} type={type} value={value} onChange={onChange} />;
};

export default InputField;
