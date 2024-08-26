import React, { useState } from 'react';
import ContactCardModal from './components/molecules/ContactCardModal/ContactCardModal';
import Modal from './components/molecules/Modal/Modal';
import ContactCardList from './components/organism/ContactCardList/ContactCardList';
import { saveContact, fetchContacts } from './components/services/api';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleOpenModal = () => {
    setNewContact({ firstName: '', lastName: '', email: '' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveContact = async (contact: Contact) => {
    try {
      const savedContact: Contact = await saveContact(contact);
      setContacts((prevContacts) => [...prevContacts, savedContact]);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  React.useEffect(() => {
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
      <h1>Contact List</h1>
      <button onClick={handleOpenModal}>Add new contact</button>
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
  );
};

export default App;
