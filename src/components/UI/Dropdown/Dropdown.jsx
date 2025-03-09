import React, { useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

function Dropdown({ children, isOpen, width, className, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onClose) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`${styles.container} ${className || ''}`}
          style={{ minWidth: width }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Dropdown;
