// src/components/AdBanner/AdBanner.jsx
import React from 'react';
import styles from './AdBanner.module.css';

const AdBanner = ({ imageUrl, linkUrl }) => {
  return (
    <div className={styles.adBanner}>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt="Advertisement" />
      </a>
    </div>
  );
};

export default AdBanner;
