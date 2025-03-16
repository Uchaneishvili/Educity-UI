import React from 'react';
import styles from './Messenger.module.css';

export function Messenger() {
  return (
    <div className={styles.messengerContainer}>
      <a
        href={`https://m.me/103745982593375`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.messengerButton}
        aria-label="Chat on Messenger"
      >
        <img
          src="/assets/messenger-icon.png"
          alt="Chat on Messenger"
          className={styles.messengerIcon}
        />
      </a>
    </div>
  );
}
