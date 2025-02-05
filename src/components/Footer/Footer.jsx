import styles from './Footer.module.css'
import { SubscribeInput } from '../UI/SubscribeInput/SubscribeInput'
import { LocationIcon, MessageIcon, PhoneIcon } from '../UI/icons'
import SocialMedia from '../SocialMedia/SocialMedia'
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfoContainer}>
        <div className={styles.logo}>Educity</div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კომპანია</div>
          <div className={styles.footerSectionText} onClick={() => navigate('/')}>
            მთავარი
          </div>
          <div className={styles.footerSectionText}>კურსები</div>
          <div className={styles.footerSectionText}>ჩვენს შესახებ</div>
          <div className={styles.footerSectionText} onClick={() => navigate('/contacts')}>
            კონტაქტი
          </div>
          <div className={styles.footerSectionText}>გახდი პარტნიორი</div>
        </div>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footerSectionTitle}>კონტაქტი</div>
          <div className={styles.footerSectionText}>
            <LocationIcon /> თბილისი ალ. ყაზბეგის გამზ. 30ა / კ. ქუთათელაძის კვეთა
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
        <SubscribeInput inputPlaceholder="enter your email" buttonName="Subscribe" />
      </div>

      <div className={styles.footerMediaContainer}>
        <div className={styles.footerMediaInnerContainer}>
          <div className={styles.footerRightsText}>© 2024</div>
          <SocialMedia />
        </div>
      </div>
    </footer>
  )
}
