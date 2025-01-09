import styles from "./Footer.module.css";
import { SubscribeInput } from "../UI/SubscribeInput/SubscribeInput";
import { LocationIcon, MessageIcon, PhoneIcon } from "../UI/icons";
import SocialMedia from "../SocialMedia/SocialMedia";

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
            <LocationIcon /> თბილისი ალ. ყაზბეგის გამზ. 30ა / კ. ქუთათელაძის
            კვეთა
          </a>
          <a>
            <PhoneIcon />
            +995 599 200 944
          </a>
          <a>
            <MessageIcon />
            info@educity.ge
          </a>
        </div>
        <SubscribeInput
          inputPlaceholder="enter your email"
          buttonName="Subscribe"
        />
      </div>

      <div className={styles.footerMediaContainer}>
        <div className={styles.footerMediaInnerContainer}>
          <div className={styles.footerRightsText}>
            © 2024 Lift Media | All Rights Reserved
          </div>
          <SocialMedia />
        </div>
      </div>
    </footer>
  );
}
