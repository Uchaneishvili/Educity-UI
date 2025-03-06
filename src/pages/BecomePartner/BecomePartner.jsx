import React, { useState } from 'react';
import styles from './BecomePartner.module.css';
import {
  PhoneIcon,
  MessageIcon,
  LocationIcon,
} from '../../components/UI/icons';
import SocialMedia from '../../components/SocialMedia/SocialMedia';
import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import { Button } from '../../components/UI/Button/Button';

function BecomePartner() {
  const partners = [
    {
      name: '1',
      logo: '/assets/userAvatar.png',
    },
    {
      name: '2',
      logo: '/assets/userAvatar.png',
    },
    {
      name: '3',
      logo: '/assets/userAvatar.png',
    },
    {
      name: '4',
      logo: '/assets/userAvatar.png',
    },
    {
      name: '5',
      logo: '/assets/userAvatar.png',
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.becomePartnerInfoContainer}>
          <div className={styles.becomePartnerInfoTexts}>
            <div className={styles.becomePartnerInfoTitle}>
              შექმენი გამორჩეული ტალანტებისგან შემდგარი გუნდი
            </div>
            <div className={styles.becomePartnerInfoDescription}>
              გახდი ედუსითის პარტნიორი, დაზოგე დრო თანხა და კომპანიისთვის
              მნიშვნელოვანი სხვა რესურსები, შექმენი გამორჩეული ტალანტებისგან
              შემდგარი გუნდი.
            </div>
          </div>
          <div className={styles.becomePartnerInfoImage}>
            <img
              src="/assets/becomePartnerBanner.png"
              alt="team working in office"
            />
          </div>
        </div>

        <div className={styles.partnerCompaniesContainer}>
          <div className={styles.partnerCompaniesTitle}>
            პარტნიორი კომპანიები
          </div>
          <div className={styles.partnerCompanies}>
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <div
                className={styles.partnerCompaniesLogosContainer}
                key={rowIndex}
              >
                {partners.map((partner, index) => {
                  const wrappedIndex = (index + rowIndex) % partners.length;
                  return (
                    <div
                      className={styles.partnerCompanyLogoContainer}
                      key={index}
                    >
                      <img
                        src={partners[wrappedIndex].logo}
                        alt={partners[wrappedIndex].name}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.becomePartnerFormContainer}>
          <div className={styles.becomePartnerFormInfoContainer}>
            <div>
              <div className={styles.becomePartnerFormTitle}>
                გახდი პარტნიორი
              </div>

              <div className={styles.becomePartnerFormSectionButtons}>
                <button
                  className={
                    active === 0
                      ? styles.becomePartnerFormSectionActiveButton
                      : ''
                  }
                  onClick={() => setActive(0)}
                >
                  დასაქმება
                </button>
                <button
                  className={
                    active === 1
                      ? styles.becomePartnerFormSectionActiveButton
                      : ''
                  }
                  onClick={() => setActive(1)}
                >
                  კორპორატიული შეთავაზება
                </button>
                <button
                  className={
                    active === 2
                      ? styles.becomePartnerFormSectionActiveButton
                      : ''
                  }
                  onClick={() => setActive(2)}
                >
                  სოციალური პასუხისმგებლობა
                </button>
              </div>

              <div className={styles.becomePartnerFormDescription}>
                ჩვენ გაწვდით საჭირო უნარებით აღჭურვილ კადრს, რომლებიც მზად არიან
                დიდი მოტივაციით ჩაერთონ კომპანიის საქმიანობაში და შეიტანონ
                წვლილი მის განვითარებაში. მიმართულებები: ვებ დეველოპერი, ბექ-ენდ
                დეველოპერი, ციფრული პროდუქტების ტესტერი, გრაფიკული დიზაინერი,
                UI/UX დიზაინერი, გაყიდვები მენეჯერი, სასტუმროს მენეჯერი.
                ფრონტ-ენდ დეველოპერი.
              </div>
            </div>

            <div>
              <div className={styles.becomePartnersInfo}>
                <div className={styles.becomePartnerInfo}>
                  <PhoneIcon /> 995 (032) 2 12 09 90
                </div>
                <div className={styles.becomePartnerInfo}>
                  <MessageIcon /> customerservice@spacecargo.ge
                </div>
                <div className={styles.becomePartnerInfo}>
                  <LocationIcon /> თბილისი ალ. ყაზბეგის გამზ. 30ა / კ.
                  ქუთათელაძის კვეთა
                </div>
              </div>

              <SocialMedia />
            </div>
          </div>

          <form className={styles.becomePartnerInputFormContainer}>
            <div className={styles.twoInputsContainer}>
              <div className={styles.nameInputContainer}>
                <Input
                  type="text"
                  id="name"
                  name="სახელი"
                  placeholder="სახელი"
                />
              </div>
              <div className={styles.lastNameInputContainer}>
                <Input
                  type="text"
                  id="lastName"
                  name="გვარი"
                  placeholder="გვარი"
                />
              </div>
            </div>
            <div className={styles.twoInputsContainer}>
              <div className={styles.emailInputContainer}>
                <Input
                  type="text"
                  id="email"
                  name="ელ-ფოსტა"
                  placeholder="ელ-ფოსტა"
                />
              </div>
              <div className={styles.phoneNumberInputContainer}>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="ტელეფონის ნომერი"
                  placeholder="5XX XXX XXX"
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                id="title"
                name="კომპანიის დასახელება"
                placeholder="კომპანია"
              />
            </div>
            <div>
              <Textarea
                id="message"
                name="შეტყობინება"
                placeholder="დაწერეთ თქვენი შეტყობინება.."
              />
            </div>

            <div className={styles.becomePartnerButtonContainer}>
              <Button type="primary" children="გაგზავნა" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BecomePartner;
