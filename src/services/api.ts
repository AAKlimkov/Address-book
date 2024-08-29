import { UseContactsService, Contact } from '@/types';
import { useState, useEffect, useCallback } from 'react';

export const useContactsService = (): UseContactsService => {
  const [data, setData] = useState<Contact[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const addContact = async (contact: Contact): Promise<void> => {
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
      await response.json();
      fetchContacts();
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateContact = async (contact: Contact): Promise<void> => {
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
      fetchContacts();
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteContact = async (contactId: string): Promise<void> => {
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
      fetchContacts();
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    data,
    error,
    loading,
    addContact,
    updateContact,
    deleteContact,
    fetchContacts,
  };
};
