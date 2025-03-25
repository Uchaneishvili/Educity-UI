import React from 'react';
import styles from './Button.module.css';
import { trackEvent } from '../../../utils/ClarityTracking';

export function Button({
  type = 'primary',
  children,
  onClick,
  width,
  shadow = true,
  disabled,
  eventName,
  eventValue,
}) {
  const handleClick = e => {
    // Track the button click if eventName is provided
    if (eventName) {
      trackEvent(eventName, eventValue || 'clicked');
    }

    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${styles[type]} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
      style={{ width: width, boxShadow: !shadow && 'none' }}
    >
      {children}
    </button>
  );
}
