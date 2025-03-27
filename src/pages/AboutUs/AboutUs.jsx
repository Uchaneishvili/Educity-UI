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
                ჩვენი მიზანია, თითოეული მოსწავლე მივიყვანოთ 0-დან სამუშაო
                მზადყოფნამდე. ვასწავლოთ, რაც შეიძლება მეტ ადამიანს, ის უნარები,
                რომლებიც მათ მოთხოვნას გაზრდის დღევანდელ ტექნოლოგიურ ბაზარზე და
                შეძლებენ ციფრულ მომავალთან ადაპტირებას. თითოეული მენტორი
                მოსწავლეს უდგება ინდივიდუალურად და მზად არის ბოლომდე მიყვეს და
                არ შემოიფარგლება საგაკვეთილო დროით.
              </div>
            </div>
            <div className={styles.aboutUsGoalTextContainer}>
              <div className={styles.aboutUsGoalTitle}>
                რატომ პროგრამა და არა კურსი
              </div>
              <div className={styles.aboutUsGoalDescription}>
                ედუსითიში არ გვაქვს კურსები, გვაქვს პროგრამები ჩვენი გუნდი იმაზე
                მეტს აკეთებს ვიდრე უბრალოდ ლექციებია. თითოეული მენტორი მზადაა
                დამატებით აგიხსნას გაუგებარი საკითხები, შეგხვდნენ
                ინდივიდუალურად, გვერდში დაგიდგნენ, როგორც კარიერული, ასევე
                მორალური თვალსაზრისით. პროგრამასთან ერთად ხდები ჩვენი ონლაინ
                საზოგადოების (Community-ის) წევრი, რომელიც შექმნილია იმისთვის,
                რომ სწავლების პერიოდი კიდევ უფრო საინტერესო და შემეცნებითი
                გახდეს.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
