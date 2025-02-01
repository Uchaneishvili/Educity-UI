import React, { useState } from "react";
import styles from "./UserInfo.module.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Courses from "./Components/Courses/Courses";

function UserInfo() {
  const [page, setPage] = useState("dashboard");

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
              onClick={() => setPage("dashboard")}
            >
              DASHBOARD
            </button>
            <button
              className={`${styles.userNavigationButton}`}
              onClick={() => setPage("courses")}
            >
              COURSES
            </button>
            <button className={styles.userNavigationButton}>WISHLIST</button>
            <button className={styles.userNavigationButton}>
              PURCHASE HISTORY
            </button>
            <button className={styles.userNavigationButton}>SETTINGS</button>
          </div>
        </div>

        {page === "dashboard" && (
          <>
            <Dashboard />
            <Courses />
          </>
        )}
        {page === "courses" && <Courses hideTitle={true} />}
      </div>
    </div>
  );
}

export default UserInfo;
