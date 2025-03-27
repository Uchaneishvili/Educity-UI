import React, { useState, useEffect } from 'react';
import styles from './Messenger.module.css';

export function Messenger() {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.messengerContainer}>
      <a
        href={`https://m.me/103745982593375`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.messengerButton}
        aria-label="Chat on Messenger"
        onClick={() => setShowBubble(false)}
      >
        <img
          src="/assets/messenger-icon.png"
          alt="Chat on Messenger"
          loading="lazy"
          className={styles.messengerIcon}
        />
      </a>

      {showBubble && (
        <div className={styles.messageBubble}>
          <div className={styles.bubbleContent}>
            გამარჯობა! დაგვიკავშირდით Messenger-ზე
          </div>
        </div>
      )}
    </div>
  );
}
