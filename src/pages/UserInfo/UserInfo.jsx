import React, { useState, useEffect } from "react";
import styles from "./UserInfo.module.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import CoursesTab from "./Components/CoursesTab/CoursesTab";
import Wishlist from "./Components/Wishlist/Wishlist";
import PurchaseHistory from "./Components/PurchaseHistory/PurchaseHistory";
import UserSettings from "./Components/UserSettings/UserSettings";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
function UserInfo() {
  const [page, setPage] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.pathname === "/me") {
      setPage("dashboard");
    } else if (location.pathname === "/me/courses") {
      setPage("courses");
    } else if (location.pathname === "/me/wishlist") {
      setPage("wishlist");
    } else if (location.pathname === "/me/purchase-history") {
      setPage("purchaseHistory");
    } else if (location.pathname === "/me/settings") {
      setPage("settings");
    }
  }, [location.pathname]);

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.userNavigationContainer}>
          <div className={styles.userProfile}>
            <div className={styles.userPhoto}>
              <img src="/assets/userPhoto.png" alt="user" />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.fullName}</div>
            </div>
          </div>
          <div className={styles.userNavigation}>
            <button
              className={`${styles.userNavigationButton} ${
                page === "dashboard" && styles.active
              }`}
              onClick={() => {
                setPage("dashboard");
                navigate("/me");
              }}
            >
              DASHBOARD
            </button>
            <button
              className={`${styles.userNavigationButton} ${
                page === "courses" && styles.active
              }`}
              onClick={() => {
                setPage("courses");
                navigate("/me/courses");
              }}
            >
              COURSES
            </button>
            <button
              className={`${styles.userNavigationButton} ${
                page === "wishlist" && styles.active
              }`}
              onClick={() => {
                setPage("wishlist");
                navigate("/me/wishlist");
              }}
            >
              WISHLIST
            </button>
            <button
              className={`${styles.userNavigationButton} ${
                page === "purchaseHistory" && styles.active
              }`}
              onClick={() => {
                setPage("purchaseHistory");
                navigate("/me/purchase-history");
              }}
            >
              PURCHASE HISTORY
            </button>
            <button
              className={`${styles.userNavigationButton} ${
                page === "settings" && styles.active
              }`}
              onClick={() => {
                setPage("settings");
                navigate("/me/settings");
              }}
            >
              SETTINGS
            </button>
          </div>
        </div>

        {page === "dashboard" && (
          <>
            <Dashboard />
            <CoursesTab />
          </>
        )}
        {page === "courses" && <CoursesTab hideTitle={true} />}
        {page === "wishlist" && <Wishlist />}
        {page === "purchaseHistory" && <PurchaseHistory />}
        {page === "settings" && <UserSettings />}
      </div>
    </div>
  );
}

export default UserInfo;
