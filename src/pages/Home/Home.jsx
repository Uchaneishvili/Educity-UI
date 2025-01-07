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
  VideoPauseIcon,
  VideoLiveIcon,
  VideoSoundIcon,
  CommentsButtonArrow,
  CourseGraduateStar,
} from "../../components/UI/icons";
import Card from "../../components/Card/Card";
import { SubscribeInput } from "../../components/UI/SubscribeInput/SubscribeInput";

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

  const videoLessonsBannerPhoto = "/assets/videoLessonsBanner.png";
  const courseGraduateGirlPhoto = "/assets/courseGraduateGirlPhoto.png";
  const subscribePhoto1 = "/assets/subscribePhoto1.png";
  const subscribePhoto2 = "/assets/subscribePhoto2.png";
  const subscribePhoto3 = "/assets/subscribePhoto3.png";
  const subscribePhoto4 = "/assets/subscribePhoto4.png";
  const subscribePhoto5 = "/assets/subscribePhoto5.png";
  const subscribePhoto6 = "/assets/subscribePhoto6.png";

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
      <div className={styles.videoLessonsSectionContainer}>
        <div className={styles.videoLessonsTitle}>
          მაღალი ხარისხის ვიდეო გაკვეთილები
        </div>

        <div className={styles.videoLessonsInnerContainer}>
          <div className={styles.videoLessonsButtonsContainer}>
            <div className={styles.videoLessonsButtonContainer}>
              <div className={styles.videoPauseIconBg}>
                <VideoPauseIcon />
              </div>
              <div className={styles.videoLessonsButtonText}>
                ჩაწერილი ვიდეო ლექციები
              </div>
            </div>
            <div className={styles.videoLessonsButtonContainer}>
              <div className={styles.videoLiveIconBg}>
                <VideoLiveIcon />
              </div>
              <div className={styles.videoLessonsButtonText}>
                LIVE გაკვეთილები
              </div>
            </div>
            <div className={styles.videoLessonsButtonContainer}>
              <div className={styles.videoSoundIconBg}>
                <VideoSoundIcon />
              </div>
              <div className={styles.videoLessonsButtonText}>
                მუდმივი წვდომა ვიდეო ლექციებზე
              </div>
            </div>
          </div>
          <div className={styles.bannerSide}>
            <img src={videoLessonsBannerPhoto} alt="videoLessonsTeam" />
          </div>
        </div>
      </div>
      <div className={styles.courseGraduateSectionContainer}>
        <div className={styles.courseGraduateInnerContainer}>
          <div className={styles.courseGraduateTextsContainer}>
            <div className={styles.courseGraduateTitle}>
              რას ამბობენ კურსდამთავრებულები?
            </div>

            <div className={styles.courseGraduateDescription}>
              Lorem ipsum dolor sit amet consectetur. Id id sed est magnis est.
              Egestas purus at egestas nulla tellus. Egestas proin erat fusce
              turpis. Eu viverra mauris tellus aliquam. Lorem ipsum dolor sit
              amet consectetur. Id id sed est magnis est. Egestas purus at
              egestas nulla tellus. Egestas proin erat fusce turpis. Eu viverra
              mauris tellus aliquam.
            </div>

            <button className={styles.courseGraduateButton}>
              დაგვიტოვე კომენტარი
              <div className={styles.courseGraduateButtonArrow}>
                <CommentsButtonArrow />
              </div>
            </button>
          </div>

          <div className={styles.courseGraduatePersonContainer}>
            <img src={courseGraduateGirlPhoto} alt="courseGraduateGirl" />
            <div className={styles.courseGraduateCommentFullContainer}>
              <div className={styles.courseGraduateCommentLeftShadow}></div>
              <div className={styles.courseGraduateCommentContainer}>
                <div className={styles.courseGraduateGrayLine}></div>
                <div>
                  <div className={styles.courseGraduateText}>
                    "Thank you so much for your help. It's exactly what I've
                    been looking for. You won't regret it. It really saves me
                    time and effort. TOTC is exactly what our business has been
                    lacking."
                  </div>
                  <div className={styles.courseGraduatePersonInfo}>
                    <div className={styles.courseGraduateName}>Gloria Rose</div>
                    <div className={styles.courseGraduateStars}>
                      <CourseGraduateStar />
                      <CourseGraduateStar />
                      <CourseGraduateStar />
                      <CourseGraduateStar />
                      <CourseGraduateStar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subscribeSectionContainer}>
        <div className={styles.subscribePhotosContainer}>
          <img src={subscribePhoto1} alt="Subscribe Person" />
          <img
            src={subscribePhoto2}
            className={styles.subscribePhoto2}
            alt="Subscribe Person"
          />
          <img
            src={subscribePhoto3}
            className={styles.subscribePhoto3}
            alt="Subscribe Person"
          />
        </div>
        <div className={styles.subscribeInfoContainer}>
          <div className={styles.subscribeTitle}>
            SUBSCRIBE FOR GET UPDATE
            <br /> EVERY NEW COURSES
          </div>
          <div className={styles.subscribeDescription}>
            20k+ students daily learn with Eduvi. Subscribe for new courses.
          </div>
          <SubscribeInput />
        </div>
        <div className={styles.subscribePhotosContainer}>
          <img
            src={subscribePhoto4}
            className={styles.subscribePhoto4}
            alt="Subscribe Person"
          />
          <img
            src={subscribePhoto5}
            className={styles.subscribePhoto5}
            alt="Subscribe Person"
          />
          <img src={subscribePhoto6} alt="Subscribe Person" />
        </div>
      </div>
    </div>
  );
}
