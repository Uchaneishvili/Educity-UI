import React from 'react';
import styles from './Textarea.module.css';

function Textarea({ id, name, placeholder, value, onChange }) {
  return (
    <div className={styles.textareaContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <textarea
        id={id}
        name="Textarea"
        placeholder={placeholder}
        className={styles.textarea}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default Textarea;
