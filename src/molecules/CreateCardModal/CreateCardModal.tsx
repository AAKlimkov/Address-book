import React, { useState } from 'react';
import styles from './CreateCardModal.module.css';
import InputField from '@/atoms/Input/InputField';
import Button from '@/atoms/Button/Button';

interface CreateCardModalProps {
  onSave: (updatedEntry: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;

  onClose: () => void;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  onSave,
  onClose,
}) => {
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const isSaveDisabled =
    editFirstName.trim() === '' &&
    editLastName.trim() === '' &&
    editEmail.trim() === '';

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(event.target.value);
  };

  const handleSave = () => {
    onSave({
      firstName: editFirstName,
      lastName: editLastName,
      email: editEmail,
    });
  };

  return (
    <div className={styles.CreateCardModal}>
      <h2>'Create Contact'</h2>
      <div className={styles.inputRow}>
        <div className={styles.inputField}>
          <InputField
            id="firstName"
            type="text"
            value={editFirstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            label="First Name"
          />
        </div>
        <div className={styles.inputField}>
          <InputField
            id="lastName"
            type="text"
            value={editLastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            label="Last Name"
          />
        </div>
      </div>
      <div className={styles.inputField}>
        <InputField
          id="email"
          type="email"
          value={editEmail}
          onChange={handleEmailChange}
          placeholder="Email"
          label="Email"
        />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.rightButtons}>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCardModal;
