import React from "react";
import styles from "./PaginationButton.module.css";

export function PaginationButton({ label, isActive, onClick }) {
  return (
    <button
      className={`${styles.paginationButton} ${isActive && styles.isActive} `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
