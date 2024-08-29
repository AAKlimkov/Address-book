import { Contact } from '../components/organism/ContactCardList/ContactCardList';

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await fetch('http://localhost:3001/contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const saveContact = async (contact: Contact): Promise<Contact> => {
  try {
    const response = await fetch('http://localhost:3001/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to save contact');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};

export const updateContact = async (contact: Contact): Promise<Contact> => {
  try {
    const response = await fetch(
      `http://localhost:3001/contacts/${contact.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

export const deleteContact = async (contactId: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3001/contacts/${contactId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
