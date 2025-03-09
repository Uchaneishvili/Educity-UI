import styles from './Footer.module.css';
import { SubscribeInput } from '../UI/SubscribeInput/SubscribeInput';
import { LocationIcon, MessageIcon, PhoneIcon } from '../UI/icons';
import SocialMedia from '../SocialMedia/SocialMedia';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Footer() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [navigate]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfoContainer}>
        <div className={styles.logo}>Educity</div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კომპანია</div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/')}
          >
            მთავარი
          </div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/courses')}
          >
            კურსები
          </div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/aboutus')}
          >
            ჩვენს შესახებ
          </div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/contacts')}
          >
            კონტაქტი
          </div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/become-partner')}
          >
            გახდი პარტნიორი
          </div>
          <div
            className={styles.footerSectionText}
            onClick={() => navigate('/subscriptions')}
          >
            პაკეტები
          </div>
        </div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კონტაქტი</div>
          <div className={styles.footerSectionText}>
            <LocationIcon /> თბილისი, ვაჟა-ფშაველას 45
          </div>
          <div className={styles.footerSectionText}>
            <PhoneIcon />
            +995 599 200 944
          </div>
          <div className={styles.footerSectionText}>
            <MessageIcon />
            info@educity.ge
          </div>
        </div>
        <SubscribeInput
          inputPlaceholder="შეიყვანეთ ელ.ფოსტა"
          buttonName="გამოწერა"
        />
      </div>

      <div className={styles.footerMediaContainer}>
        <div className={styles.footerMediaInnerContainer}>
          <div className={styles.footerRightsText}>© 2025 Educity </div>
          <SocialMedia />
        </div>
      </div>
    </footer>
  );
}
