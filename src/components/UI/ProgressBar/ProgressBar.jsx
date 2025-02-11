import React from 'react'
import styles from './ProgressBar.module.css'

export function ProgressBar({ percentage, totalBars = 5 }) {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        {[...Array(totalBars)].map((_, index) => (
          <div
            key={index}
            className={`${styles.progressLine} ${
              index + 1 <= (totalBars * percentage) / 100 ? styles.completed : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
