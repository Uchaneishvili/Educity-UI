import React from "react";
import styles from "./Courses.module.css";
import Pagination from "../../../../components/UI/Pagination/Pagination";
import { Card } from "../../../../components/UI/Card/Card";

function Courses({ hideTitle }) {
  return (
    <div className={styles.coursesContainer}>
      <div
        className={styles.coursesTitle}
        style={{ display: hideTitle ? "none" : "block" }}
      >
        Let's start learning, Kevin
      </div>

      <div className={styles.courseCards}>
        <div className={styles.courseCard}>
          <Card />
        </div>
        <div className={styles.courseCard}>
          <Card />
        </div>
        <div className={styles.courseCard}>
          <Card />
        </div>
        <div className={styles.courseCard}>
          <Card />
        </div>
        <div className={styles.courseCard}>
          <Card />
        </div>
        <div className={styles.courseCard}>
          <Card />
        </div>
      </div>

      <div className={styles.paginationContainer}>
        <Pagination totalItems="9" pageSize="3" currentPage="1" />
      </div>
    </div>
  );
}

export default Courses;
