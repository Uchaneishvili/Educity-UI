import styles from "./Header.module.css";
import { Button } from "../UI/Button/Button";
import { BurgerMenuIcon } from "../UI/icons";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <div className={styles.logo}>Educity</div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>მთავარი</li>
            <li>კურსები</li>
            <li>Ჩვენს შესახებ</li>
            <li>კონტაქტი</li>
            <li>ბიზნესისთვის</li>
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
