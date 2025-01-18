import React from 'react'
import styles from './Checkbox.module.css'

const Checkbox = ({ name }) => (
  <label className={styles.customCheckbox}>
    <input name={name} type="checkbox" />
    <span className={styles.checkmark}></span>
  </label>
)

export default Checkbox
