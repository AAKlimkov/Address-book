import React from 'react';
import Button from '../../atoms/Button/Button';
import InputField from '../../atoms/Input/InputField';

interface CardProps {
  firstName: string;
  lastName: string;
  email: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const Card: React.FC<CardProps> = ({
  firstName,
  lastName,
  email,
  onChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="card">
      <h2>Neuer Eintrag</h2>
      <div className="card-inputs">
        <InputField
          id="firstName"
          type="text"
          value={firstName}
          onChange={onChange}
        />
        <InputField
          id="lastName"
          type="text"
          value={lastName}
          onChange={onChange}
        />
        <InputField id="email" type="email" value={email} onChange={onChange} />
      </div>
      <div className="card-buttons">
        <Button onClick={onCancel} variant="secondary">
          Abbrechen
        </Button>
        <Button onClick={onSave} variant="primary">
          Speichern
        </Button>
      </div>
    </div>
  );
};

export default Card;
