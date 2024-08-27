import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';
import styles from './InputField.module.css';

describe('InputField Component', () => {
  test('renders InputField and responds to changes', () => {
    const handleChange = jest.fn();
    render(
      <InputField id="test" type="text" value="" onChange={handleChange} />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(styles.input);
    expect(input).not.toHaveClass(styles.error);

    fireEvent.change(input, { target: { value: 'Test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('applies error class when error prop is true', () => {
    render(
      <InputField
        id="test"
        type="text"
        value=""
        onChange={() => {}}
        error={true}
      />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(styles.input);
    expect(input).toHaveClass(styles.error);
  });

  test('does not apply error class when error prop is false', () => {
    render(
      <InputField
        id="test"
        type="text"
        value=""
        onChange={() => {}}
        error={false}
      />
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(styles.input);
    expect(input).not.toHaveClass(styles.error);
  });
});
