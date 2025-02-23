import React from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ children, isOpen, width }) {
  return (
    <>
      {isOpen && (
        <div className={styles.container} style={{ maxWidth: width }}>
          {children}
        </div>
      )}
    </>
  );
}

export default Dropdown;
