import React from "react";
import styles from "./Dashboard.module.css";
import {
  ActiveCoursesIcon,
  CompletedCoursesIcon,
  EnrolledCoursesIcon,
} from "../../../../components/UI/icons";

function Dashboard() {
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
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardTitle}>Dashboard</div>

      <div className={styles.dashboardCards}>
        {dashboardInfo.map((card, index) => (
          <div className={styles.dashboardCard} key={index}>
            <div className={styles.dashboardCardIconContainer}>{card.icon}</div>
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
  );
}

export default Dashboard;
