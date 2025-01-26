import React from "react";
import styles from "./PaginationButton.module.css";

export function PaginationButton({ label, isActive, onClick, disabled }) {
  return (
    <button
      className={`${styles.paginationButton} ${isActive && styles.isActive} `}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
