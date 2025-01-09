import React from "react";
import styles from "./SubscribeInput.module.css";

export function SubscribeInput({ inputPlaceholder, buttonName }) {
  return (
    <div className={styles.subscribeInputContainer}>
      <input
        type="email"
        placeholder={inputPlaceholder}
        name="subscribe-email"
        className={styles.subscribeInput}
      />
      <button className={styles.subscribeButton}>{buttonName}</button>
    </div>
  );
}
