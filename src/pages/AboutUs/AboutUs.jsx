import React from 'react';
import styles from './AboutUs.module.css';

export function AboutUs() {
  const aboutUsDataArray = [
    {
      quantity: '20',
      title: 'სპიკერი',
      description:
        'ჩვენ ვთანამშრომლობთ ციფრულ ინდუსტრიებში აღიარებულ მენტორებთან',
    },
    {
      quantity: '50',
      title: 'პარტნიორი',
      description:
        'სტუდენტთა დასაქმების ხელშეწყობის მიზნით ვთანამშრომლობთ სხვადასხვა წამყვან კომპანიასთან',
    },
    {
      quantity: '400',
      title: 'სტუდენტი',
      description:
        'ჩვენ წარმატებით გადავამზადეთ 400-ზე მეტი სტუდენტი და ხელი შევუწყეთ მათ პროფესიულ განვითარებას',
    },
  ];

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.aboutUsDescContainer}>
          <div className={styles.aboutUsTextsContainer}>
            <div className={styles.aboutUsTextsTitle}>
              რატომ უნდა შემოგვიერთდე?
            </div>
            <div className={styles.aboutUsTextsDesc}>
              ედუსითი 2023 წელს დაარსდა, იმ იდეით, რომ ყოფილიყო ყველაზე სანდო და
              მომხმარებელზე ორიენტირებული აკადემია. ჩვენ გთავაზობთ თანამედროვე
              სასწავლო პროგრამებს, პრაქტიკულ მიდგომას და მრავალფეროვან სწავლების
              ფორმატს – ონლაინ, აუდიტორიული და ასევე ვიდეო ლექციები. რომლებსაც
              თავის სფეროში გამოცდილი და წარმატებული მენტორები უძღვებიან.
            </div>
          </div>

          <div className={styles.aboutUsDescBannerContainer}>
            <img
              src="/assets/aboutUsDescBanner.png"
              alt="educity team banner"
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.aboutUsDataContainer}>
          {aboutUsDataArray.map((card, index) => (
            <div className={styles.aboutUsDataCard} key={index}>
              <div className={styles.aboutUsDataNumber}>{card.quantity}+</div>
              <div className={styles.aboutUsDataTitle}>{card.title}</div>
              <div className={styles.aboutUsDataDesc}>{card.description}</div>
            </div>
          ))}
        </div>

        <div className={styles.aboutUsGoalContainer}>
          <div className={styles.aboutUsGoalBannerContainer}>
            <img
              src="/assets/aboutUsGoalBanner.png"
              alt="educity team"
              loading="lazy"
            />
          </div>

          <div className={styles.aboutUsGoalTextsContainer}>
            <div className={styles.aboutUsGoalTextContainer}>
              <div className={styles.aboutUsGoalTitle}>EDUCITY-ის მიზანი</div>
              <div className={styles.aboutUsGoalDescription}>
                ჩვენი მიზანია, თითოეული მოსწავლე 0-დან სამუშაო მზადყოფნამდე
                მივიყვანოთ. ვასწავლოთ რაც შეიძლება მეტ ადამიანს ის უნარები,
                რომლებიც მათ კონკურენტუნარიანს გახდის დღევანდელ სწრაფად
                განვითარებად ბაზარზე. სწავლის პროცესი მოქნილი და ხელმისაწვდომია
                ყველასთვის – გთავაზობთ ვიდეო ლექციებს, ონლაინ სწავლებას და
                აუდიტორიულ კურსებს.
              </div>
            </div>
            <div className={styles.aboutUsGoalTextContainer}>
              <div className={styles.aboutUsGoalTitle}>
                რატომ პროგრამა და არა კურსი
              </div>
              <div className={styles.aboutUsGoalDescription}>
                EduCity-ში ჩვენ არ გთავაზობთ უბრალოდ კურსებს – ჩვენ ვქმნით
                სრულფასოვან სასწავლო პროგრამებს! ლექციები მხოლოდ დასაწყისია.
                ჩვენი გუნდი მაქსიმუმს აკეთებს იმისთვის, რომ სწავლა იყოს
                პრაქტიკული, საფუძვლიანი და შენთვის სასარგებლო. მენტორები მზად
                არიან დამატებით აგიხსნან გაუგებარი საკითხები, ინდივიდუალურად
                შეგხვდნენ და დაგიდგნენ გვერდში როგორც კარიერული, ასევე პიროვნული
                განვითარების გზაზე. ჩვენთან სწავლა მოქნილი და კომფორტულია!
                შეგიძლია დაესწრო ონლაინ ან აუდიტორიულ ლექციებს, ხოლო ვიდეო
                ლექციების დახმარებით იმეცადინო შენთვის სასურველ დროს და შენს
                რიტმში.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
