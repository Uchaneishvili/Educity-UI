import React from 'react'
import styles from './Input.module.css'

const Input = ({ type, id, name, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <input type={type} id={id} name={name} placeholder={placeholder} className={styles.input} />
    </div>
  )
}

export default Input
