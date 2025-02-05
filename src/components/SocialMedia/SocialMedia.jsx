import React from 'react'
import styles from './SocialMedia.module.css'
import { LinkedinIcon, FacebookIcon, InstagramIcon } from '../UI/icons'

function SocialMedia() {
  return (
    <div className={styles.SocialMediaIcons}>
      <a href="https://www.linkedin.com/company/educity1">
        <LinkedinIcon />
      </a>
      <a href="https://www.facebook.com/p/EduCity-100088498458265/">
        <FacebookIcon />
      </a>
      <a href="https://www.instagram.com/__educity/">
        <InstagramIcon />
      </a>
    </div>
  )
}

export default SocialMedia
