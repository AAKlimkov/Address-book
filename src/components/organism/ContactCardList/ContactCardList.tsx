import React, { useState, useEffect } from 'react';
import styles from './ContactCardList.module.css';
import Modal from '@/components/molecules/Modal/Modal';
import ContactCard from '@/components/molecules/ContactCard/ContactCard';
import ContactCardModal from '@/components/molecules/ContactCardModal/ContactCardModal';
import {
  fetchContacts,
  updateContact,
  deleteContact,
} from '@/components/services/api';

interface CardListProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ContactCardList: React.FC<CardListProps> = ({
  contacts,
  setContacts,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<null | Contact>(null);
  const [showAddButton, setShowAddButton] = useState(true); // State for managing button visibility

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    loadContacts();
  }, [setContacts]);

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
    setShowAddButton(false); // Hide add button when editing
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
    setShowAddButton(true); // Show add button when modal is closed
  };

  const handleSaveContact = async (updatedContact: Contact) => {
    try {
      const updatedContactFromServer = await updateContact(updatedContact);

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContactFromServer.id
            ? updatedContactFromServer
            : contact
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await deleteContact(contactId);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setModalOpen(true);
    setShowAddButton(false); // Hide add button when adding
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
          onClick={handleAddContact}
        >
          +
        </button>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <ContactCardModal
            firstName={selectedContact?.firstName || ''}
            lastName={selectedContact?.lastName || ''}
            email={selectedContact?.email || ''}
            onSave={(updatedContact) =>
              handleSaveContact({ ...selectedContact, ...updatedContact })
            }
            onDelete={() =>
              selectedContact && handleDeleteContact(selectedContact.id)
            }
            onClose={handleCloseModal}
            mode={selectedContact ? 'edit' : 'add'}
          />
        </Modal>
      )}
    </div>
  );
};

export default ContactCardList;
