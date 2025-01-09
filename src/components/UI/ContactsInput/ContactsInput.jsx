import React from "react";
import styles from "./ContactsInput.module.css";

const ContactsInput = ({ input = "input", type, id, name, placeholder }) => {
  return (
    <div className={styles.contactsInputContainer}>
      <label htmlFor={id}>{name}</label>
      {input === "input" ? (
        <input
          type={type}
          id={id}
          name="contactInput"
          placeholder={placeholder}
          className={styles.input}
        />
      ) : (
        <textarea
          id={id}
          name="contactInput"
          placeholder={placeholder}
          className={styles.textarea}
        ></textarea>
      )}
    </div>
  );
};

export default ContactsInput;
