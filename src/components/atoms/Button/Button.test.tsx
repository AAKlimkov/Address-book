import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders the button with the correct text', () => {
    render(
      <Button onClick={() => {}} variant="primary">
        click me
      </Button>
    );
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} variant="primary">
        click me
      </Button>
    );
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when the disabled prop is true', () => {
    render(
      <Button onClick={() => {}} variant="primary" disabled>
        click me
      </Button>
    );
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeDisabled();
  });
  test('applies the correct variant class', () => {
    render(
      <Button onClick={() => {}} variant="secondary">
        Abbrechen
      </Button>
    );

    const buttonElement = screen.getByText(/Abbrechen/i);
    expect(buttonElement).toHaveClass('button secondary');
  });
});
