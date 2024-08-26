// src/components/molecules/Modal/Modal.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const renderModal = (onClose: jest.Mock) => {
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
  };

  test('renders modal content in the body', () => {
    const onClose = jest.fn();
    renderModal(onClose);

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    renderModal(onClose);

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when modal content is clicked', () => {
    const onClose = jest.fn();
    renderModal(onClose);

    const modalContent = screen.getByText('Modal Content');
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });
});
