import React from 'react'
import styles from './OrDivider.module.css'
export function OrDivider() {
  return (
    <div className={styles.dividerContainer}>
      <div className={styles.line}></div>
      <span className={styles.text}>ან</span>
      <div className={styles.line}></div>
    </div>
  )
}
