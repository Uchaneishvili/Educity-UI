import styles from "./Footer.module.css";
import { SubscribeInput } from "../UI/SubscribeInput/SubscribeInput";
import {
  FooterFacebookIcon,
  FooterInstagramIcon,
  FooterLinkedinIcon,
  FooterLocationIcon,
  FooterMessageIcon,
  FooterPhoneIcon,
} from "../UI/icons";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfoContainer}>
        <div className={styles.logo}>Educity</div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კომპანია</div>
          <a>მთავარი</a>
          <a>კურსები</a>
          <a>ჩვენს შესახებ</a>
          <a>კონტაქტი</a>
          <a>გახდი პარტნიორი</a>
        </div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კონტაქტი</div>
          <a>
            <FooterLocationIcon /> თბილისი ალ. ყაზბეგის გამზ.
            <br />
            30ა / კ. ქუთათელაძის კვეთა
          </a>
          <a>
            <FooterPhoneIcon />
            +995 599 200 944
          </a>
          <a>
            <FooterMessageIcon />
            info@educity.ge
          </a>
        </div>
        <SubscribeInput />
      </div>

      <div className={styles.footerMediaContainer}>
        <div className={styles.footerMediaInnerContainer}>
          <div className={styles.footerRightsText}>
            © 2024 Lift Media | All Rights Reserved
          </div>
          <div className={styles.footerMediaIcons}>
            <a>
              <FooterLinkedinIcon />
            </a>
            <a>
              <FooterFacebookIcon />
            </a>
            <a>
              <FooterInstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
