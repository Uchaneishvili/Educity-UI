import React from 'react'
import styles from './Checkbox.module.css'

const Checkbox = () => (
  <label className={styles.customCheckbox}>
    <input name="dummy" type="checkbox" />
    <span className={styles.checkmark}></span>
  </label>
)

export default Checkbox
