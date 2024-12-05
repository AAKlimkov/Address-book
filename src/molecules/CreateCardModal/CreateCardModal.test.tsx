import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactCardModal from './CreateCardModal';

const mockOnSave = jest.fn();
const mockOnDelete = jest.fn();
const mockOnClose = jest.fn();

describe('ContactCardModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with initial values', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText('First Name')).toHaveValue('John');
    expect(screen.getByPlaceholderText('Last Name')).toHaveValue('Doe');
    expect(screen.getByPlaceholderText('Email')).toHaveValue(
      'john.doe@example.com'
    );
  });

  test('updates input fields correctly', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    expect(screen.getByLabelText('First Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john.doe@example.com');

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane.smith@example.com' },
    });

    expect(screen.getByLabelText('First Name')).toHaveValue('Jane');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Smith');
    expect(screen.getByLabelText('Email')).toHaveValue(
      'jane.smith@example.com'
    );
  });

  test('calls onSave with updated values', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'jane.smith@example.com' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    });
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('disables Save button when all fields are empty', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    expect(screen.getByText('Save')).toBeDisabled();
  });

  test('enables Save button when fields are not empty', () => {
    render(<ContactCardModal onSave={mockOnSave} onClose={mockOnClose} />);

    expect(screen.getByText('Save')).toBeEnabled();
  });
});
