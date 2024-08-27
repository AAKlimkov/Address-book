import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactCard from './ContactCard';

describe('ContactCard Component', () => {
  const mockProps = {
    firstName: 'John',
    lastName: 'Dev',
    email: 'dev-jobs@gmail.com',
    onClick: jest.fn(),
  };

  it('renders the correct name and email', () => {
    render(<ContactCard {...mockProps} />);


    expect(screen.getByText('John Dev')).toBeInTheDocument();


    expect(screen.getByText('dev-jobs@gmail.com')).toBeInTheDocument();
  });
});
