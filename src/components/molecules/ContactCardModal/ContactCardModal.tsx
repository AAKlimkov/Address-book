import React, { useState, useEffect } from 'react';
import styles from './ContactCardModal.module.css';
import InputField from '@/components/atoms/Input/InputField';

interface ContactCardModalProps {
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
  mode: 'edit' | 'add';
}

const ContactCardModal: React.FC<ContactCardModalProps> = ({
  firstName,
  lastName,
  email,
  onSave,
  onDelete,
  onClose,
  mode,
}) => {
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editEmail, setEditEmail] = useState(email);

  const isSaveDisabled =
    !editFirstName.trim() && !editLastName.trim() && !editEmail.trim();

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
    <div className={styles.ContactCardModal}>
      <h2>{mode === 'edit' ? 'Edit Contact' : 'Create Contact'}</h2>
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
        {mode === 'edit' && (
          <div className={styles.leftButtons}>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
        <div className={styles.rightButtons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCardModal;
