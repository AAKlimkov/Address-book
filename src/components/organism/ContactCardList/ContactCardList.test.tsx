// src/components/ContactCardList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as api from '@/components/services/api';
import React from 'react';
import ContactCardList, { Contact } from './ContactCardList';

jest.mock('@/components/services/api', () => ({
  fetchContacts: jest.fn(),
  updateContact: jest.fn(),
  deleteContact: jest.fn(),
}));

const mockContacts: Contact[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
];

describe('ContactCardList', () => {
  beforeEach(() => {
    (api.fetchContacts as jest.Mock).mockResolvedValue(mockContacts);
    (api.updateContact as jest.Mock).mockResolvedValue(mockContacts[0]);
    (api.deleteContact as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders contact cards', async () => {
    render(<ContactCardList contacts={mockContacts} setContacts={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  it('handles errors when fetching contacts', async () => {
    (api.fetchContacts as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch contacts')
    );

    console.error = jest.fn();
    render(<ContactCardList contacts={[]} setContacts={jest.fn()} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error loading contacts:',
        expect.any(Error)
      );
    });
  });

  it('opens and closes the modal on card click', async () => {
    render(<ContactCardList contacts={mockContacts} setContacts={jest.fn()} />);

    const contactCard = screen.getByText('John Doe');
    fireEvent.click(contactCard);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('saves a contact', async () => {
    render(<ContactCardList contacts={mockContacts} setContacts={jest.fn()} />);

    const contactCard = screen.getByText('John Doe');
    fireEvent.click(contactCard);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(api.updateContact).toHaveBeenCalled();
    });
  });

  it('handles errors when saving a contact', async () => {
    const error = new Error('Failed to save contact');
    (api.updateContact as jest.Mock).mockRejectedValue(error);

    console.error = jest.fn();

    const setContacts = jest.fn();

    render(
      <ContactCardList contacts={mockContacts} setContacts={setContacts} />
    );

    fireEvent.click(screen.getByText('John Doe'));

    fireEvent.change(screen.getByPlaceholderText('firstName'), {
      target: { value: 'John Updated' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(api.updateContact).toHaveBeenCalledWith({
        id: 1,
        firstName: 'John Updated',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      });

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      expect(console.error).toHaveBeenCalledWith(
        'Error saving contact:',
        error
      );
    });
  });

  it('deletes a contact', async () => {
    render(<ContactCardList contacts={mockContacts} setContacts={jest.fn()} />);

    const contactCard = screen.getByText('John Doe');
    fireEvent.click(contactCard);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(api.deleteContact).toHaveBeenCalledWith(1);
    });
  });
});
