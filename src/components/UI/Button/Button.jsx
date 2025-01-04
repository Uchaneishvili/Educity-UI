import React from "react";
import styles from "./Button.module.css";

export function Button({ type = "primary", children, onClick }) {
  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}
