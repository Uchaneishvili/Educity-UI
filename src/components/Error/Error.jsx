import React from 'react'
import styles from './Error.module.css'
import { ErrorIcon } from '../UI/icons'
export function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.errorTitle}>Error</div>
      <div className={styles.errorImgContainer}>
        <ErrorIcon />
      </div>
    </div>
  )
}
