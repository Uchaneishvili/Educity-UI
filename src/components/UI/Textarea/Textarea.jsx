import React from "react";
import styles from "./Textarea.module.css";

function Textarea({ id, name, placeholder }) {
  return (
    <div className={styles.textareaContainer}>
      <label htmlFor={id}>{name}</label>
      <textarea
        id={id}
        name="Textarea"
        placeholder={placeholder}
        className={styles.textarea}
      ></textarea>
    </div>
  );
}

export default Textarea;
