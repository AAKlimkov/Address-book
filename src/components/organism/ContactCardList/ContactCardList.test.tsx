import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';
import ContactCardList, { Contact } from './ContactCardList';
import * as api from '@/components/services/api';

jest.mock('@/components/services/api', () => ({
  fetchContacts: jest.fn(),
  updateContact: jest.fn(),
  deleteContact: jest.fn(),
  saveContact: jest.fn(),
}));

const mockUpdateContact = api.updateContact as jest.Mock;
const mockDeleteContact = api.deleteContact as jest.Mock;
const mockSaveContact = api.saveContact as jest.Mock;

const dummyContacts: Contact[] = [
  {
    id: uuidv4(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  },
];

describe('ContactCardList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact cards', () => {
    render(
      <ContactCardList contacts={dummyContacts} setContacts={jest.fn()} />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('opens modal when card is clicked', async () => {
    render(
      <ContactCardList contacts={dummyContacts} setContacts={jest.fn()} />
    );

    fireEvent.click(screen.getByText('John Doe'));

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();

    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
  });

  test('adds a new contact', async () => {
    const setContactsMock = jest.fn();
    render(
      <ContactCardList contacts={dummyContacts} setContacts={setContactsMock} />
    );

    fireEvent.click(screen.getByText('+'));

    const newContact = {
      id: uuidv4(),
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    };
    mockSaveContact.mockResolvedValue(newContact);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane.smith@example.com' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockSaveContact).toHaveBeenCalledWith({
        id: expect.any(String),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
      });
      expect(setContactsMock).toHaveBeenCalled();
    });
  });

  test('edits an existing contact', async () => {
    const setContactsMock = jest.fn();
    render(
      <ContactCardList contacts={dummyContacts} setContacts={setContactsMock} />
    );

    fireEvent.click(screen.getByText('John Doe'));

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Johnny' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockUpdateContact).toHaveBeenCalledWith({
        id: dummyContacts[0].id,
        firstName: 'Johnny',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      });
      expect(setContactsMock).toHaveBeenCalled();
    });
  });

  test('deletes a contact', async () => {
    const setContactsMock = jest.fn();
    render(
      <ContactCardList contacts={dummyContacts} setContacts={setContactsMock} />
    );

    fireEvent.click(screen.getByText('John Doe'));

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockDeleteContact).toHaveBeenCalledWith(dummyContacts[0].id);
      expect(setContactsMock).toHaveBeenCalled();
    });
  });
});
