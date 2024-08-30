import React, { useState } from 'react';

import Button from './atoms/Button/Button';
import styles from './App.module.css';
import ContactCardList from './organism/ContactCardList/ContactCardList';
import Modal from './molecules/Modal/Modal';
import CreateCardModal from './molecules/CreateCardModal/CreateCardModal';
import { Contact } from './types';
import { useContactsService } from './services/api';

const App: React.FC = () => {
  const { data, addContact, refetch } = useContactsService();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    await addContact(contact);
    refetch(); // Refetch the contacts after saving a new one
    handleCloseModal();
  };

  return (
    <div>
      <h1 className={styles.header}>Contact List</h1>
      <div className={styles.content}>
        <Button
          onClick={handleOpenModal}
          variant="primary"
          className={`${styles.addButton} `}
        >
          Add new contact
        </Button>

        {data && <ContactCardList contacts={data} />}

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <CreateCardModal
              onSave={handleSaveContact}
              onClose={handleCloseModal}
            />
          </Modal>
        )}

        <button
          className={`${styles.addButtonRound} ${styles.roundButton}`}
          onClick={handleOpenModal}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default App;
