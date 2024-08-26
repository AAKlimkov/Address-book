import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactCard from './ContactCard';

describe('ContactCard Component', () => {
  const mockProps = {
    firstName: 'Matthias',
    lastName: 'Käpernick',
    email: 'dev-jobs@autohaus-koenig.de',
    onClick: jest.fn(),
  };

  it('renders the correct name and email', () => {
    render(<ContactCard {...mockProps} />);

    // Проверяем, что рендерится правильное имя
    expect(screen.getByText('Matthias Käpernick')).toBeInTheDocument();

    // Проверяем, что рендерится правильный email
    expect(screen.getByText('dev-jobs@autohaus-koenig.de')).toBeInTheDocument();
  });
});
