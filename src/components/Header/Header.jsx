import { useState } from "react";
import styles from "./Header.module.css";
import { Button } from "../UI/Button/Button";
import { BurgerMenuIcon } from "../UI/icons";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export function Header() {
  const [sideBarActive, setSideBarActive] = useState(false);

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <SideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      />
      <div className={styles.container}>
        <div>
          <div className={styles.logo} onClick={() => navigate("/")}>
            Educity
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li onClick={() => navigate("/")}>მთავარი</li>
            <li onClick={() => navigate("/courses")}>კურსები</li>
            <li onClick={() => navigate("/aboutus")}>Ჩვენს შესახებ</li>
            <li onClick={() => navigate("/contacts")}>კონტაქტი</li>
            <li onClick={() => navigate("/business")}>ბიზნესისთვის</li>
          </ul>
          <div
            className={styles.burgerMenu}
            onClick={() => setSideBarActive(true)}
          >
            <BurgerMenuIcon />
          </div>
        </nav>

        <div className={styles.authButtons}>
          <Button type="secondary">რეგისტრაცია</Button>
          <Button type="primary" onClick={() => navigate("/login")}>
            ავტორიზაცია
          </Button>
        </div>
      </div>
    </header>
  );
}
