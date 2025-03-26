import React, { useState } from 'react';
import styles from './Accordion.module.css';
import { ArrowDownIcon, ArrowUpIcon } from '../icons';

export function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordionItem}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.accordionHeaderContent}>
          <div className={styles.accordionIcon}>
            {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
          <div
            className={`${styles.accordionTitle} ${
              isOpen ? styles.openAccordionTitle : ''
            }`}
          >
            {title}
          </div>
        </div>
        <div className={styles.videosInfo}>
          <span>{children.props.children.length} ლექცია</span>
        </div>
      </div>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}
      >
        {children}
      </div>
    </div>
  );
}
