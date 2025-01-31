import React from "react";
import styles from "./UserInfo.module.css";
import {
  ActiveCoursesIcon,
  CompletedCoursesIcon,
  EnrolledCoursesIcon,
} from "../../components/UI/icons";
import Pagination from "../../components/UI/Pagination/Pagination";
import { Card } from "../../components/UI/Card/Card";

function UserInfo() {
  const dashboardInfo = [
    {
      title: "Enrolled Courses",
      amount: "957",
      icon: <EnrolledCoursesIcon />,
    },
    {
      title: "Active Courses",
      amount: "6",
      icon: <ActiveCoursesIcon />,
    },
    {
      title: "Completed Courses",
      amount: "951",
      icon: <CompletedCoursesIcon />,
    },
  ];

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.userNavigationContainer}>
          <div className={styles.userProfile}>
            <div className={styles.userPhoto}>
              <img src="/assets/userPhoto.png" alt="user" />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Kevin Gilbert</div>
              <div className={styles.userProfession}>
                Web Designer & Best-Selling Instructor
              </div>
            </div>
          </div>
          <div className={styles.userNavigation}>
            <button
              className={`${styles.userNavigationButton} ${styles.active}`}
            >
              DASHBOARD
            </button>
            <button className={`${styles.userNavigationButton}`}>
              COURSES
            </button>
            <button className={styles.userNavigationButton}>WISHLIST</button>
            <button className={styles.userNavigationButton}>
              PURCHASE HISTORY
            </button>
            <button className={styles.userNavigationButton}>SETTINGS</button>
          </div>
        </div>

        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardTitle}>Dashboard</div>

          <div className={styles.dashboardCards}>
            {dashboardInfo.map((card, index) => (
              <div className={styles.dashboardCard} key={index}>
                <div className={styles.dashboardCardIconContainer}>
                  {card.icon}
                </div>
                <div className={styles.dashboardCardInfo}>
                  <div className={styles.dashboardCardInfoAmount}>
                    {card.amount}
                  </div>
                  <div className={styles.dashboardCardTitle}>{card.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.coursesContainer}>
          <div className={styles.coursesTitle}>Let's start learning, Kevin</div>

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
          </div>

          <div className={styles.paginationContainer}>
            <Pagination totalItems="9" pageSize="3" currentPage="1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
