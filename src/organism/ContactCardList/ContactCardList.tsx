import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactCardList.module.css';

import { Contact } from '@/types';
import ContactCard from '@/molecules/ContactCard/ContactCard';
import { useContactsService } from '@/services/api';
import Modal from '@/molecules/Modal/Modal';
import ContactCardModal from '@/molecules/ConctactCardModal/ContactCardModal';

interface CardListProps {
  contacts: Contact[];
}

const ContactCardList: React.FC<CardListProps> = ({ contacts }) => {
  const { addContact, deleteContact, updateContact } = useContactsService();
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
      await addContact(contact);
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
