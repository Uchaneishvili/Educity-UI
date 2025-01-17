import React from 'react'
import styles from './Button.module.css'

export function Button({ type = 'primary', children, onClick, width }) {
  return (
    <button className={styles[type]} onClick={onClick} style={{ width: width }}>
      {children}
    </button>
  )
}
