import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdressCard from './AdressCard';

test('renders AdressCard component with all inputs and buttons', () => {
  const handleChange = jest.fn();
  const handleCancel = jest.fn();
  const handleSave = jest.fn();

  render(
    <AdressCard
      firstName="John"
      lastName="Doe"
      email="john.doe@example.com"
      onChange={handleChange}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  );

  const firstNameInput = screen.getByDisplayValue('John');
  const lastNameInput = screen.getByDisplayValue('Doe');
  const emailInput = screen.getByDisplayValue('john.doe@example.com');
  const cancelButton = screen.getByText('Abbrechen');
  const saveButton = screen.getByText('Speichern');

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();

  fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
  fireEvent.click(cancelButton);
  fireEvent.click(saveButton);

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleCancel).toHaveBeenCalledTimes(1);
  expect(handleSave).toHaveBeenCalledTimes(1);
});
