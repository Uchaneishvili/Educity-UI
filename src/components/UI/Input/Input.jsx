import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, id, name, placeholder }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        name="Input"
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
