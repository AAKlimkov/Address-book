import React, { useState } from 'react';
import styles from './ContactCardList.module.css';

import { Contact } from '@/types';
import ContactCard from '@/molecules/ContactCard/ContactCard';
import { useContactsService } from '@/services/api';
import Modal from '@/molecules/Modal/Modal';
import EditCardModal from '@/molecules/EditCardModal/EditCardModal';

interface CardListProps {
  contacts: Contact[];
}

const ContactCardList: React.FC<CardListProps> = ({ contacts }) => {
  const { deleteContact, updateContact, refetch } = useContactsService();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<null | Contact>(null);

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };

  const handleDelete = async () => {
    if (selectedContact) {
      await deleteContact(selectedContact.id);
      refetch();
      handleCloseModal();
    }
  };

  const handleSave = async (contact: Contact) => {
    await updateContact(contact);
    refetch();
    handleCloseModal();
  };

  return (
    <div className={styles.cardList}>
      {contacts.map((contact) => (
        <div key={contact.id} className={styles.cardItem}>
          <ContactCard {...contact} onClick={() => handleCardClick(contact)} />
        </div>
      ))}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <EditCardModal
            firstName={selectedContact?.firstName}
            lastName={selectedContact?.lastName}
            email={selectedContact?.email || ''}
            onSave={(updatedContact) =>
              handleSave({ ...selectedContact, ...updatedContact })
            }
            onDelete={handleDelete}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ContactCardList;
