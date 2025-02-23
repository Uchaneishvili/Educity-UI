import React, { useEffect } from "react";
import styles from "./SideBar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../UI/Button/Button";
import { CloseIcon, UserIcon } from "../UI/icons";
import AuthService from "../../services/auth.service";

const authService = new AuthService();

function SideBar({ sideBarActive, setSideBarActive }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshSideBar = () => {
      if (sideBarActive) {
        setSideBarActive(false);
      }
    };

    refreshSideBar();
  }, [navigate]);

  const isActive = (path) => location.pathname === path;

  const isAuthenticated = () => {
    return !!authService.getToken();
  };

  const sideBarLinks = [
    {
      name: "მთავარი",
      link: "/",
    },
    {
      name: "კურსები",
      link: "/courses",
    },
    {
      name: "ჩვენს შესახებ",
      link: "/aboutus",
    },
    {
      name: "კონტაქტი",
      link: "/contacts",
    },
    {
      name: "გახდი პარტნიორი",
      link: "/become-partner",
    },
  ];

  const sideBarLoggedLinks = [
    {
      name: "მთავარი",
      link: "/",
    },
    {
      name: "კურსები",
      link: "/courses",
    },
    {
      name: "ჩვენს შესახებ",
      link: "/aboutus",
    },
    {
      name: "კონტაქტი",
      link: "/contacts",
    },
    {
      name: "გახდი პარტნიორი",
      link: "/become-partner",
    },
    {
      name: "ჩემი პროფილი",
      link: "/me",
    },
  ];

  return (
    <div
      className={styles.sideBarContainer}
      style={{
        transform: sideBarActive ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div className={styles.sideBarInnerContainer}>
        <div className={styles.sideBarLogo} onClick={() => navigate("/")}>
          Educity
        </div>

        <div
          className={styles.closeIcon}
          onClick={() => setSideBarActive(false)}
        >
          <CloseIcon />
        </div>
      </div>

      {isAuthenticated() && (
        <div className={styles.authenticatedUserContainer}>
          <div className={styles.userIcon}>
            <UserIcon />
          </div>
          <div className={styles.userName}>Sophia Rose</div>
        </div>
      )}
      <div className={styles.sideBarLinksContainer}>
        {(isAuthenticated() ? sideBarLoggedLinks : sideBarLinks).map(
          (page, index) => (
            <div
              className={`${styles.sideBarLink} ${
                isActive(page.link) ? styles.active : ""
              }`}
              onClick={() => navigate(page.link)}
              key={index}
            >
              {page.name}
            </div>
          )
        )}
      </div>

      {!isAuthenticated() ? (
        <div className={styles.authButtons}>
          <Button type="primary">ავტორიზაცია</Button>
          <Button type="secondary">რეგისტრაცია</Button>
        </div>
      ) : (
        <div className={styles.logOutButton}>
          <Button type="secondary">LOG OUT</Button>
        </div>
      )}
    </div>
  );
}

export default SideBar;
