import React from 'react'
import styles from './Checkbox.module.css'

const Checkbox = ({ checked, onChange, name, color = 'blue' }) => (
  <label className={`${styles.iosCheckbox} ${styles[color]}`}>
    <input name={name} type="checkbox" checked={checked} onChange={onChange} />
    <div className={styles.checkboxWrapper}>
      <div className={styles.checkboxBg}></div>
      <svg fill="none" viewBox="0 0 24 24" className={styles.checkboxIcon}>
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="3"
          stroke="currentColor"
          d="M4 12L10 18L20 6"
          className={styles.checkPath}
        />
      </svg>
    </div>
  </label>
)

export default Checkbox
