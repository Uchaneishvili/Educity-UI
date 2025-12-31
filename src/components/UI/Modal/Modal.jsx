import React from 'react';
import styles from './Modal.module.css';

function Modal({ children, isOpen, width, onClose }) {
  return (
    <>
      {isOpen && (
        <div className={styles.container} onClick={onClose}>
          <div
            className={styles.modalContainer}
            style={{ maxWidth: width }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
