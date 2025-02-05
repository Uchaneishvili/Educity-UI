import React from "react";
import styles from "./Error.module.css";

function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.errorTitle}>Error</div>
      <div className={styles.errorImgContainer}>
        <img src="/assets/errorBanner.png" alt="error banner" />
      </div>
    </div>
  );
}

export default Error;
