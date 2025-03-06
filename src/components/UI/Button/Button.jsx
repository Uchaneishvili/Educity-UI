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
      className={styles[type]}
      onClick={onClick}
      disabled={disabled} // TODO Add disabled style
      style={{ width: width, boxShadow: !shadow && 'none' }}
    >
      {children}
    </button>
  );
}
