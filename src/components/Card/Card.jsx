import React from "react";
import styles from "./Card.module.css";

const Card = ({ icon, title, coursesCount }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.courseCount}>{coursesCount} Courses</p>
      </div>
    </div>
  );
};

export default Card;
