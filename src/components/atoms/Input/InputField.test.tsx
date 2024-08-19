import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

test('renders InputField and responds to changes', () => {
  const handleChange = jest.fn();
  render(<InputField id="test" type="text" value="" onChange={handleChange} />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Test' } });
  expect(handleChange).toHaveBeenCalled();
});
