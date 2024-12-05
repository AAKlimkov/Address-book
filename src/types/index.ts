export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UseContactsService {
  data: Contact[] | null;
  error: Error | null;
  loading: boolean;
  addContact: (contact: Contact) => Promise<void>;
  updateContact: (contact: Contact) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  fetchContacts: () => void;
}
