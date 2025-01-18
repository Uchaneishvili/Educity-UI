import React from "react";
import styles from "./SideBar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../UI/Button/Button";
import { XIcon } from "../UI/icons";

function SideBar({ sideBarActive, setSideBarActive }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

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
      name: "ბიზნესისთვის",
      link: "/business",
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

        <div className={styles.xIcon} onClick={() => setSideBarActive(false)}>
          <XIcon />
        </div>
      </div>

      <div className={styles.sideBarLinksContainer}>
        {sideBarLinks.map((page, index) => (
          <div
            className={`${styles.sideBarLink} ${
              isActive(page.link) ? styles.active : ""
            }`}
            onClick={() => navigate(page.link)}
            key={index}
          >
            {page.name}
          </div>
        ))}
      </div>

      <div className={styles.authButtons}>
        <Button type="primary">ავტორიზაცია</Button>
        <Button type="secondary">რეგისტრაცია</Button>
      </div>
    </div>
  );
}

export default SideBar;
