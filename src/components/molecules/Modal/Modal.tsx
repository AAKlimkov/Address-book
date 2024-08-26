import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return ReactDOM.createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      data-testid="modal-overlay"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
