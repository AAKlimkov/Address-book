import { useState, useEffect, useCallback } from 'react';
import { Contact } from '@/types';

export const useContactsService = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = async (contact: Contact) => {
    try {
      const response = await fetch('http://localhost:3001/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      await response.json();
      await fetchContacts(); // Refetch data after adding a contact
    } catch (err) {
      setError('Error adding contact');
      throw new Error(err);
    }
  };

  const updateContact = async (contact: Contact) => {
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
      await response.json();
      await fetchContacts(); // Refetch data after updating a contact
    } catch (err) {
      setError('Error updating contact');
      throw new Error(err);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      await fetchContacts(); // Refetch data after deleting a contact
    } catch (err) {
      setError('Error deleting contact');
      throw new Error(err);
    }
  };

  return {
    data,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts,
  };
};
