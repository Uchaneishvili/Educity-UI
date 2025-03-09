import React from 'react';
import styles from './SocialMedia.module.css';
import { LinkedinIcon, FacebookIcon, InstagramIcon } from '../UI/icons';

function SocialMedia() {
  return (
    <div className={styles.SocialMediaIcons}>
      <a
        href="https://www.linkedin.com/company/educity1"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedinIcon />
      </a>
      <a
        href="https://www.facebook.com/p/EduCity-100088498458265/"
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.instagram.com/__educity/"
        target="_blank"
        rel="noreferrer"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

export default SocialMedia;
