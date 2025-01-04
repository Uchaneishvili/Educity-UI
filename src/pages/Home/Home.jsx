import styles from "./Home.module.css";
import { Button } from "../../components/UI/Button/Button";
import {
  GraphicDesignIcon,
  MainPageGirlPhoto,
  FrontendDevelopmentIcon,
  UIUXDesignIcon,
  HotelManagementIcon,
  QAEngineeringIcon,
  DigitalMarketingIcon,
  SalesManagementIcon,
  EduSchoolIcon,
} from "../../components/UI/icons";
import Card from "../../components/Card/Card";
export function Home() {
  const categories = [
    {
      icon: <GraphicDesignIcon />,
      title: "გრაფიკული დიზანი",
      coursesCount: 38,
    },
    {
      icon: <FrontendDevelopmentIcon />,
      title: "FRONT END DEVELOPMENT",
      coursesCount: 38,
    },
    {
      icon: <UIUXDesignIcon />,
      title: "UI/UX დიზაინი",
      coursesCount: 38,
    },
    {
      icon: <HotelManagementIcon />,
      title: "სასტუმროს მენეჯმენტი",
      coursesCount: 38,
    },
    {
      icon: <QAEngineeringIcon />,
      title: "QA Engineering",
      coursesCount: 38,
    },
    {
      icon: <DigitalMarketingIcon />,
      title: "ციფრული მარკეტინგი",
      coursesCount: 38,
    },
    {
      icon: <SalesManagementIcon />,
      title: "გაყიდვების მენეჯმენტი",
      coursesCount: 38,
    },
    {
      icon: <EduSchoolIcon />,
      title: "EduSchool-ის პროგრამა",
      coursesCount: 38,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.textSide}>
          <div className={styles.title}>
            ისწავლე, განვითარდი და მიაღწიე ჩვენთან ერთად!
          </div>
          <div className={styles.description}>
            დაეუფლე ციფრულ ტექნოლოგიებს 0-დან, ისარგებლე დაფინანსებული კურსებით
            და რაც მთავარია, ისწავლე ნებისმიერი ადგილიდან. ჩვენთან მიიღებ
            სრულყოფილ განათლებას და დასაქმების შანსს.
          </div>
          <div className={styles.registrationButton}>
            <Button type="primary">კურსზე რეგისტრაცია</Button>
          </div>
        </div>
        <div className={styles.bannerSide}>
          <MainPageGirlPhoto />
        </div>
      </div>
      <div className={` ${styles.categoriesSectionContainer}`}>
        <div className={styles.ourCoursesHeaderContainer}>
          <div className={styles.ourCoursesHeader}>
            <div className={styles.ourCoursesTitle}>ᲩᲕᲔᲜᲘ ᲙᲣᲠᲡᲔᲑᲘ</div>
            <div className={styles.ourCoursesDescription}>
              Explore our Popular Categories
            </div>
          </div>
          <div className={styles.allCategories}>ყველას ნახვა</div>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.categoriesContainer}>
            <div className={styles.ourCoursesTitleMobile}>ᲩᲕᲔᲜᲘ ᲙᲣᲠᲡᲔᲑᲘ</div>

            {categories.map((category, index) => (
              <Card
                key={index}
                icon={category.icon}
                title={category.title}
                coursesCount={category.coursesCount}
              />
            ))}
            <div className={styles.allCategoriesMobile}>ყველას ნახვა</div>
          </div>
        </div>
      </div>
    </div>
  );
}
