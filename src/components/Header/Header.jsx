import styles from "./Header.module.css";
import { Button } from "../UI/Button/Button";
import { BurgerMenuIcon } from "../UI/icons";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <div className={styles.logo}>Educity</div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li onClick={() => navigate("/")}>მთავარი</li>
            <li onClick={() => navigate("/courses")}>კურსები</li>
            <li onClick={() => navigate("/aboutus")}>Ჩვენს შესახებ</li>
            <li onClick={() => navigate("/contacts")}>კონტაქტი</li>
            <li onClick={() => navigate("/business")}>ბიზნესისთვის</li>
          </ul>
          <div className={styles.burgerMenu}>
            <BurgerMenuIcon />
          </div>
        </nav>

        <div className={styles.authButtons}>
          <Button type="secondary">რეგისტრაცია</Button>
          <Button type="primary">ავტორიზაცია</Button>
        </div>
      </div>
    </header>
  );
}
