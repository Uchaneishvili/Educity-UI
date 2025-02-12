import React from 'react'
import styles from './Input.module.css'

const Input = ({ type, id, name, placeholder, defaultValue }) => {
  return (
    <div className={styles.inputContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={styles.input}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default Input
