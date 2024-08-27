import React, { useEffect, useState } from 'react';
import ContactCardModal from './components/molecules/ContactCardModal/ContactCardModal';
import Modal from './components/molecules/Modal/Modal';
import ContactCardList, {
  Contact,
} from './components/organism/ContactCardList/ContactCardList';
import { saveContact, fetchContacts } from './components/services/api';
import Button from './components/atoms/Button/Button';
import styles from './App.module.css';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const refetchContacts = async () => {
    const contactsData = await fetchContacts();
    setContacts(contactsData);
  };

  const handleOpenModal = () => {
    setNewContact({ firstName: '', lastName: '', email: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    await saveContact(contact);
    handleCloseModal();
    refetchContacts();
  };

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

        <ContactCardList contacts={contacts} setContacts={setContacts} />

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
