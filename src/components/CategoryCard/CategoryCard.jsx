import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ icon, title, coursesCount, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.courseCount}>{coursesCount} Courses</p>
      </div>
    </div>
  );
};

export default CategoryCard;
