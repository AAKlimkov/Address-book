import React, { useState } from 'react';

import Button from './atoms/Button/Button';
import styles from './App.module.css';
import ContactCardList from './organism/ContactCardList/ContactCardList';
import Modal from './molecules/Modal/Modal';
import CreateCardModal from './molecules/CreateCardModal/CreateCardModal';
import { Contact } from './types';
import { useContactsService } from './services/api';

const App: React.FC = () => {
  const { data, addContact } = useContactsService();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    // const newId = uuidv4();
    // setNewContact({ id: newId, firstName: '', lastName: '', email: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    await addContact(contact);
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
      </div>
    </div>
  );
};

export default App;
