import React from 'react';
import styles from './Dropdown.module.css';

function Dropdown({ children, isOpen, width, className }) {
  return (
    <>
      {isOpen && (
        <div
          className={`${styles.container} ${className || ''}`}
          style={{ maxWidth: width }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Dropdown;
