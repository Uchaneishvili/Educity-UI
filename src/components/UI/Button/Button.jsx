import React from 'react'
import styles from './Button.module.css'

export function Button({ type = 'primary', children, onClick, width, shadow = true }) {
  return (
    <button
      className={styles[type]}
      onClick={onClick}
      style={{ width: width, boxShadow: !shadow && 'none' }}
    >
      {children}
    </button>
  )
}
