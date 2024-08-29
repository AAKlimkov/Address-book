import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactCardList.module.css';
import Modal from '@/components/molecules/Modal/Modal';
import ContactCard from '@/components/molecules/ContactCard/ContactCard';
import ContactCardModal from '@/components/molecules/ContactCardModal/ContactCardModal';
import { updateContact, deleteContact, saveContact } from '@/services/api';

interface CardListProps {
  contacts: Contact[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const ContactCardList: React.FC<CardListProps> = ({ contacts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<null | Contact>(null);
  const [showAddButton, setShowAddButton] = useState(true);
  const [mode, setMode] = useState<'edit' | 'add'>('edit');

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
    setShowAddButton(false);
    setMode('edit');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
    setShowAddButton(true);
  };

  const handleDelete = async () => {
    if (selectedContact) {
      await deleteContact(selectedContact.id);
      handleCloseModal();
    }
  };

  const handleSave = async (contact: Contact) => {
    if (mode === 'edit') {
      await updateContact(contact);
    } else {
      await saveContact(contact);
    }
    handleCloseModal();
  };

  const handleAddNewContact = () => {
    const newId = uuidv4();
    setSelectedContact({ id: newId, firstName: '', lastName: '', email: '' });
    setMode('add');
    setModalOpen(true);
  };

  return (
    <div className={styles.cardList}>
      {contacts.map((contact) => (
        <div key={contact.id} className={styles.cardItem}>
          <ContactCard {...contact} onClick={() => handleCardClick(contact)} />
        </div>
      ))}

      {showAddButton && (
        <button
          className={`${styles.addButton} ${styles.roundButton}`}
          onClick={handleAddNewContact}
        >
          +
        </button>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ContactCardModal
            firstName={selectedContact?.firstName}
            lastName={selectedContact?.lastName}
            email={selectedContact?.email || ''}
            onSave={(updatedContact) =>
              handleSave({ ...selectedContact, ...updatedContact })
            }
            onDelete={handleDelete}
            onClose={handleCloseModal}
            mode="edit"
          />
        </Modal>
      )}
    </div>
  );
};

export default ContactCardList;
