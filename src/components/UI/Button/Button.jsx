import React from 'react';
import styles from './Button.module.css';

export function Button({
  type = 'primary',
  children,
  onClick,
  width,
  shadow = true,
  disabled,
}) {
  return (
    <button
      type="button"
      className={`${styles[type]} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width, boxShadow: !shadow && 'none' }}
    >
      {children}
    </button>
  );
}
