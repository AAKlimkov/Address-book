import React from 'react';
import styles from './ContactCard.module.css';

interface ContactCardProps {
  firstName: string;
  lastName: string;
  email: string;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  firstName,
  lastName,
  email,
  onClick,
}) => {
  return (
    <div className={styles.contactCard} onClick={onClick}>
      <h3 className={styles.contactCard__name}>{`${firstName} ${lastName}`}</h3>
      <p className={styles.contactCard__email}>{email}</p>
    </div>
  );
};

export default ContactCard;
