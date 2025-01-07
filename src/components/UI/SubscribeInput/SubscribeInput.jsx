import React from "react";
import styles from "./SubscribeInput.module.css";

export function SubscribeInput() {
  return (
    <div className={styles.subscribeInputContainer}>
      <input
        type="email"
        placeholder="enter your email"
        name="subscribe-email"
        id={styles.subscribeInput}
      />
      <button className={styles.subscribeButton}>Subscribe</button>
    </div>
  );
}
