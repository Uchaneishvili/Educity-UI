import styles from './Home.module.css'
import { Button } from '../../components/UI/Button/Button'
import { HeaderBackground, HeaderMobileBackground } from '../../components/UI/icons'
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
  SubscribePhoto1,
  SubscribePhoto2,
  SubscribePhoto3,
  SubscribePhoto4,
  SubscribePhoto5,
  SubscribePhoto6
} from '../../components/UI/icons'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import { SubscribeInput } from '../../components/UI/SubscribeInput/SubscribeInput'
import { Feedback } from '../../components/UI/Feedback/Feedback'
import { useNavigate } from 'react-router-dom'
import { Messenger } from '../../components/Messenger/Messenger'

export function Home() {
  const navigate = useNavigate()

  const categories = [
    {
      icon: <GraphicDesignIcon />,
      title: 'გრაფიკული დიზანი',
      coursesCount: 38
    },
    {
      icon: <FrontendDevelopmentIcon />,
      title: 'FRONT END DEVELOPMENT',
      coursesCount: 38
    },
    {
      icon: <UIUXDesignIcon />,
      title: 'UI/UX დიზაინი',
      coursesCount: 38
    },
    {
      icon: <HotelManagementIcon />,
      title: 'სასტუმროს მენეჯმენტი',
      coursesCount: 38
    },
    {
      icon: <QAEngineeringIcon />,
      title: 'QA Engineering',
      coursesCount: 38
    },
    {
      icon: <DigitalMarketingIcon />,
      title: 'ციფრული მარკეტინგი',
      coursesCount: 38
    },
    {
      icon: <SalesManagementIcon />,
      title: 'გაყიდვების მენეჯმენტი',
      coursesCount: 38
    },
    {
      icon: <EduSchoolIcon />,
      title: 'EduSchool-ის პროგრამა',
      coursesCount: 38
    }
  ]

  return (
    <div className="mainContainer">
      <div className="header-background">
        <HeaderBackground />
      </div>

      <div className="header-mobile-background">
        <HeaderMobileBackground />
      </div>

      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.textSide}>
            <div className={styles.title}>ისწავლე, განვითარდი და მიაღწიე ჩვენთან ერთად!</div>
            <div className={styles.description}>
              დაეუფლე ციფრულ ტექნოლოგიებს 0-დან, ისარგებლე დაფინანსებული კურსებით და რაც მთავარია,
              ისწავლე ნებისმიერი ადგილიდან. ჩვენთან მიიღებ სრულყოფილ განათლებას და დასაქმების შანსს.
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
              <div className={styles.ourCoursesDescription}>Explore our Popular Categories</div>
            </div>
            <div className={styles.allCategories} onClick={() => navigate('/courses')}>
              ყველას ნახვა
            </div>
          </div>
          <div className={styles.innerContainer}>
            <div className={styles.categoriesContainer}>
              <div className={styles.ourCoursesTitleMobile}>ᲩᲕᲔᲜᲘ ᲙᲣᲠᲡᲔᲑᲘ</div>

              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  coursesCount={category.coursesCount}
                />
              ))}
              <div className={styles.allCategoriesMobile} onClick={() => navigate('/courses')}>
                ყველას ნახვა
              </div>
            </div>
          </div>
        </div>
        <div className={styles.videoLessonsSectionContainer}>
          <div className={styles.videoLessonsTitle}>მაღალი ხარისხის ვიდეო გაკვეთილები</div>

          <div className={styles.videoLessonsInnerContainer}>
            <div className={styles.videoLessonsButtonsContainer}>
              <div className={styles.videoLessonsButtonContainer}>
                <div className={styles.videoPauseIconBg}>
                  <VideoPauseIcon />
                </div>
                <div className={styles.videoLessonsButtonText}>ჩაწერილი ვიდეო ლექციები</div>
              </div>
              <div className={styles.videoLessonsButtonContainer}>
                <div className={styles.videoLiveIconBg}>
                  <VideoLiveIcon />
                </div>
                <div className={styles.videoLessonsButtonText}>LIVE გაკვეთილები</div>
              </div>
              <div className={styles.videoLessonsButtonContainer}>
                <div className={styles.videoSoundIconBg}>
                  <VideoSoundIcon />
                </div>
                <div className={styles.videoLessonsButtonText}>მუდმივი წვდომა ვიდეო ლექციებზე</div>
              </div>
            </div>
            <div className={styles.bannerSide}>
              <img src="/assets/videoLessonsBanner.png" alt="videoLessonsTeam" />
            </div>
          </div>
        </div>
        <div className={styles.courseGraduateSectionContainer}>
          <div className={styles.courseGraduateInnerContainer}>
            <div className={styles.courseGraduateTextsContainer}>
              <div className={styles.courseGraduateTitle}>რას ამბობენ კურსდამთავრებულები?</div>

              <div className={styles.courseGraduateDescription}>
                Lorem ipsum dolor sit amet consectetur. Id id sed est magnis est. Egestas purus at
                egestas nulla tellus. Egestas proin erat fusce turpis. Eu viverra mauris tellus
                aliquam. Lorem ipsum dolor sit amet consectetur. Id id sed est magnis est. Egestas
                purus at egestas nulla tellus. Egestas proin erat fusce turpis. Eu viverra mauris
                tellus aliquam.
              </div>

              <div className={styles.courseGraduateButtonContainer}>
                <button className={styles.courseGraduateButton}>
                  <div className={styles.courseGraduateButtonTitle}>დაგვიტოვე კომენტარი</div>
                  <div className={styles.courseGraduateButtonArrow}>
                    <CommentsButtonArrow />
                  </div>
                </button>
              </div>
            </div>

            <div className={styles.courseGraduatePersonContainer}>
              <img src="/assets/courseGraduateGirlPhoto.png" alt="courseGraduateGirl" />
              <div className={styles.courseGraduateCommentFullContainer}>
                <div className={styles.courseGraduateCommentLeftShadow}></div>
                <div className={styles.courseGraduateCommentContainer}>
                  <div className={styles.courseGraduateGrayLine}></div>
                  <div>
                    <div className={styles.courseGraduateText}>
                      "Thank you so much for your help. It's exactly what I've been looking for. You
                      won't regret it. It really saves me time and effort. TOTC is exactly what our
                      business has been lacking."
                    </div>
                    <div className={styles.courseGraduatePersonInfo}>
                      <div className={styles.courseGraduateName}>Gloria Rose</div>
                      <Feedback starsAmount={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subscribeSectionContainer}>
          <div className={styles.subscribePhotosContainer}>
            <SubscribePhoto1 />
            <SubscribePhoto2 />
            <SubscribePhoto3 />
          </div>
          <div className={styles.subscribeInfoContainer}>
            <div className={styles.subscribeTitle}>SUBSCRIBE FOR GET UPDATE EVERY NEW COURSES</div>
            <div className={styles.subscribeDescription}>
              20k+ students daily learn with Eduvi. Subscribe for new courses.
            </div>
            <SubscribeInput inputPlaceholder="enter your email" buttonName="Subscribe" />
          </div>
          <div className={styles.subscribePhotosContainer}>
            <SubscribePhoto4 />
            <SubscribePhoto5 />
            <SubscribePhoto6 />
          </div>
        </div>

        {/* <div className={styles.chatIconContainer}>
        <div className={styles.chatIcon}>
          <OnlineChatIcon />
        </div>
      </div> */}

        <Messenger />
      </div>
    </div>
  )
}
