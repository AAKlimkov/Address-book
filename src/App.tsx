import React, { useEffect, useState } from 'react';
import ContactCardModal from './components/molecules/ContactCardModal/ContactCardModal';
import Modal from './components/molecules/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import ContactCardList, {
  Contact,
} from './components/organism/ContactCardList/ContactCardList';
import { saveContact, fetchContacts } from './services/api';
import Button from './components/atoms/Button/Button';
import styles from './App.module.css';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const loadContacts = async () => {
    const data = await fetchContacts();
    setContacts(data);
  };

  const handleOpenModal = () => {
    const newId = uuidv4();
    setNewContact({ id: newId, firstName: '', lastName: '', email: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    await saveContact(contact);
    handleCloseModal();
    loadContacts();
  };

  useEffect(() => {
    loadContacts();
  }, []);

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

        <ContactCardList contacts={contacts} />

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <ContactCardModal
              firstName={newContact.firstName}
              lastName={newContact.lastName}
              email={newContact.email}
              onSave={handleSaveContact}
              onDelete={() => {}}
              onClose={handleCloseModal}
              mode="add"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
