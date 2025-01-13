import React from "react";
import styles from "./AboutUs.module.css";

function AboutUs() {
  const aboutUsDataArray = [
    {
      quantity: "20",
      title: "სპიკერი",
      description:
        "ჩვენ ვთანამშრომლობთ ციფრულ ინდუსტრიებში აღიარებულ მენტორებთან",
    },
    {
      quantity: "200",
      title: "პარტნიორი",
      description:
        "სტუდენტთა დასაქმების ხელშეწყობის მიზნით ვთანამშრომლობთ სხვადასხვა წამყვან კომპანიასთან",
    },
    {
      quantity: "200",
      title: "სტუდენტი",
      description:
        "ჩვენ წარმატებით გადავამზადეთ 100-ზე მეტი სტუდენტი და ხელი შევუწყეთ მათ პროფესიულ განვითარებას",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.aboutUsDescContainer}>
        <div className={styles.aboutUsTextsContainer}>
          <div className={styles.aboutUsTextsTitle}>
            რატომ უნდა შემოგვიერთდე?
          </div>
          <div className={styles.aboutUsTextsDesc}>
            ედუსითი 2023 წელს დაარსდა, იმ იდეით, რომ ყოფილიყო ყველაზე სანდო და
            მომხმარებელზე ორიენტირებული აკადემია. EduCity მომხმარებელს სთავაზობს
            პროფესიულ პროგრამებს მარკეტინგის, ტექნოლოგიების, დიზაინისა და
            მენეჯმენტის მიმართულებით. სწავლება ყოველთვის დაფუძნებულია პრაქტიკულ
            მაგალითებზე. რის შესაძლებლობასაც გვაძლევს ჩვენ სფეროებში
            მრავალწლიანი გამოცდილების მქონე, Senior პოზიციებზე მყოფი მენტორები.
          </div>
        </div>
        <img src="/assets/aboutUsDescBanner.png" alt="educity team banner" />
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
        <img src="/assets/aboutUsGoalBanner.png" alt="educity team" />

        <div className={styles.aboutUsGoalTextsContainer}>
          <div className={styles.aboutUsGoalTextContainer}>
            <div className={styles.aboutUsGoalTitle}>EDUCITY-ის მიზანი</div>
            <div className={styles.aboutUsGoalDescription}>
              ჩვენი მიზანია, თითოეული მოსწავლე მივიყვანოთ 0-დან სამუშაო
              მზადყოფნამდე. ვასწავლოთ, რაც შეიძლება მეტ ადამიანს, ის უნარები,
              რომლებიც მათ მოთხოვნას გაზრდის დღევანდელ ტექნოლოგიურ ბაზარზე და
              შეძლებენ ციფრულ მომავალთან ადაპტირებას. თითოეული მენტორი მოსწავლეს
              უდგება ინდივიდუალურად და მზად არის ბოლომდე მიყვეს და არ
              შემოიფარგლება საგაკვეთილო დროით.
            </div>
          </div>
          <div className={styles.aboutUsGoalTextContainer}>
            <div className={styles.aboutUsGoalTitle}>
              რატომ პროგრამა და არა კურსი
            </div>
            <div className={styles.aboutUsGoalDescription}>
              ედუსითიში არ გვაქვს კურსები, გვაქვს პროგრამები ჩვენი გუნდი იმაზე
              მეტს აკეთებს ვიდრე უბრალოდ ლექციებია. თითოეული მენტორი მზადაა
              დამატებით აგიხსნას გაუგებარი საკითხები, შეგხვდნენ ინდივიდუალურად,
              გვერდში დაგიდგნენ, როგორც კარიერული, ასევე მორალური თვალსაზრისით.
              პროგრამასთან ერთად ხდები ჩვენი ონლაინ საზოგადოების (Community-ის)
              წევრი, რომელიც შექმნილია იმისთვის, რომ სწავლების პერიოდი კიდევ
              უფრო საინტერესო და შემეცნებითი გახდეს.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
