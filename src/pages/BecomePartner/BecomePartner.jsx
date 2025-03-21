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
import emailjs from '@emailjs/browser';
import MarqueeEffect from '../../components/MarqueeEffect/MarqueeEffect';

function BecomePartner() {
  const partners = [
    {
      name: 'Tbilisi Meria',
      logo: '/assets/partners/meriaTbilisi.jpg',
    },
    {
      name: 'Black Sea Arena',
      logo: '/assets/partners/blackSeaArena.png',
    },
    {
      name: 'Elit Electronics',
      logo: '/assets/partners/elitElectronics.jpg',
    },
    {
      name: 'Iberia Star Group',
      logo: '/assets/partners/iberiaStarGroup.png',
    },
    {
      name: 'Ideal',
      logo: '/assets/partners/ideal.jpg',
    },
    {
      name: 'Kutaisi Inn',
      logo: '/assets/partners/KutaisiInn.jpg',
    },
    {
      name: 'Mc Drive',
      logo: '/assets/partners/mcDrive.jpg',
    },
    {
      name: 'Unison',
      logo: '/assets/partners/unison.jpg',
    },
    {
      name: 'Upway',
      logo: '/assets/partners/Upway.jpg',
    },
  ];

  const [active, setActive] = useState(0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAIL_PARTNER_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAIL_PARTNER_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    const templateParams = {
      from_name: name,
      from_lastName: lastName,
      from_email: email,
      from_phoneNumber: phoneNumber,
      from_company: company,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(response => {
        console.log('Email has been sent!', response);
        setName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setCompany('');
        setMessage('');
      })
      .catch(error => console.log(error));
  };

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
            <MarqueeEffect speed={30} shouldAnimate={true}>
              {partners.map((partner, index) => (
                <div className={styles.partnerCompanyLogoContainer} key={index}>
                  <img src={partner.logo} alt={partner.name} />
                </div>
              ))}
            </MarqueeEffect>
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

              {active === 0 && (
                <div className={styles.becomePartnerFormDescription}>
                  ჩვენ გაწვდით საჭირო უნარებით აღჭურვილ კადრს, რომლებიც მზად
                  არიან დიდი მოტივაციით ჩაერთონ კომპანიის საქმიანობაში და
                  შეიტანონ წვლილი მის განვითარებაში. მიმართულებები: ვებ
                  დეველოპერი, ბექ-ენდ დეველოპერი, ციფრული პროდუქტების ტესტერი,
                  გრაფიკული დიზაინერი, UI/UX დიზაინერი, გაყიდვები მენეჯერი,
                  სასტუმროს მენეჯერი. ფრონტ-ენდ დეველოპერი.
                </div>
              )}

              {active === 1 && (
                <div className={styles.becomePartnerFormDescription}>
                  კომპანიებს ვთავაზობთ კადრების გადამზადებას, კორპორატიულ
                  ფასდაკლებებს, მომსახურებას ტექ ინდუსტრიაში, ვორქშოფებს და
                  საერთო პროექტებს.
                </div>
              )}

              {active === 2 && (
                <div className={styles.becomePartnerFormDescription}>
                  კორპორატიული სოციალური პასუხისმგებლობის ფარგლებში, შეგიძლით
                  დაგვიკავშირდეთ და დააფინანსოთ განათლება იმ ადამიანებისთვის,
                  ვისაც სჭირდება ახალი ცხოვრების დაწყება და კარიერის გაგრძელება
                  ტექნოლოგიურ სფეროში
                </div>
              )}
            </div>

            <div>
              <div className={styles.becomePartnersInfo}>
                <div className={styles.becomePartnerInfo}>
                  <PhoneIcon /> +995 599 200 944
                </div>
                <div className={styles.becomePartnerInfo}>
                  <MessageIcon /> info@educity.ge
                </div>
                <div className={styles.becomePartnerInfo}>
                  <LocationIcon /> თბილისი, ვაჟა-ფშაველას 45
                </div>
              </div>

              <SocialMedia />
            </div>
          </div>

          <form
            className={styles.becomePartnerInputFormContainer}
            onSubmit={handleSubmit}
          >
            <div className={styles.twoInputsContainer}>
              <div className={styles.nameInputContainer}>
                <Input
                  type="text"
                  id="name"
                  name="სახელი"
                  placeholder="სახელი"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.lastNameInputContainer}>
                <Input
                  type="text"
                  id="lastName"
                  name="გვარი"
                  placeholder="გვარი"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.phoneNumberInputContainer}>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="ტელეფონის ნომერი"
                  placeholder="5XX XXX XXX"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                id="title"
                name="კომპანია"
                placeholder="კომპანიის დასახელება"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                id="message"
                name="შეტყობინება"
                placeholder="დაწერეთ თქვენი შეტყობინება.."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className={styles.becomePartnerButtonContainer}>
              <Button type="primary">გაგზავნა</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BecomePartner;
