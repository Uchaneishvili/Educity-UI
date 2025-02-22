import React from "react";
import styles from "./Modal.module.css";

function Modal({ children, isOpen, onClose, width }) {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modalContainer} style={{ maxWidth: width }}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
