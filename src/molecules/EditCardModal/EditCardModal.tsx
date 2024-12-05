import React, { useState, useEffect } from 'react';
import styles from './EditCardModal.module.css';
import InputField from '@/atoms/Input/InputField';
import Button from '@/atoms/Button/Button';

interface EditCardModalProps {
  firstName: string;
  lastName: string;
  email: string;
  onSave: (updatedEntry: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  onDelete: () => void;
  onClose: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  firstName,
  lastName,
  email,
  onSave,
  onDelete,
  onClose,
}) => {
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editEmail, setEditEmail] = useState(email);

  const isSaveDisabled =
    editFirstName.trim() === '' &&
    editLastName.trim() === '' &&
    editEmail.trim() === '';

  useEffect(() => {
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditEmail(email);
  }, [firstName, lastName, email]);

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
    <div className={styles.EditCardModal}>
      <h2>'Edit Contact' </h2>
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
        <div className={styles.leftButtons}>
          <Button onClick={onDelete} variant="danger">
            Delete
          </Button>
        </div>

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

export default EditCardModal;
