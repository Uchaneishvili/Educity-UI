import styles from './Home.module.css';
import { Button } from '../../components/UI/Button/Button';
import {
  HeaderBackground,
  HeaderMobileBackground,
} from '../../components/UI/icons';
import {
  GraphicDesignIcon,
  MainPageGirlPhoto,
  FrontendDevelopmentIcon,
  DigitalMarketingIcon,
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
  SubscribePhoto6,
} from '../../components/UI/icons';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { SubscribeInput } from '../../components/UI/SubscribeInput/SubscribeInput';
import { useNavigate } from 'react-router-dom';
import { CourseGraduateSwiper } from '../../components/CourseGraduateSwiper/CourseGraduateSwiper';
import MarketingIcon from '../../components/UI/MarketingIcon';
import BusinessIcon from '../../components/UI/BusinessIcon';
import LanguageIcon from '../../components/UI/LanguageIcon';
import ProgramsIcon from '../../components/UI/ProgramsIcon';
import { useEffect, useCallback, useState } from 'react';
import { getCategories } from '../../services/categories.service';
import { trackEvent } from '../../utils/ClarityTracking';

const categories = [
  {
    icon: <FrontendDevelopmentIcon />,
    title: 'პროგრამირება',
    coursesCount: 0,
  },
  {
    icon: <GraphicDesignIcon />,
    title: 'ციფრული დიზაინი',
    coursesCount: 0,
  },
  {
    icon: <MarketingIcon />,
    title: 'მარკეტინგი',
    coursesCount: 0,
  },
  {
    icon: <LanguageIcon />,
    title: 'უცხო ენა',
    coursesCount: 0,
  },
  {
    icon: <EduSchoolIcon />,
    title: 'ბუღალტერია',
    coursesCount: 0,
  },
  {
    icon: <DigitalMarketingIcon />,
    title: 'ფოტოგრაფია & ვიდეო',
    coursesCount: 0,
  },
  {
    icon: <BusinessIcon />,
    title: 'ბიზნესი',
    coursesCount: 0,
  },
  {
    icon: <ProgramsIcon />,
    title: 'საოფისე პროგრამები',
    coursesCount: 0,
  },
];
export function Home() {
  const navigate = useNavigate();
  const [categoriesWithCounts, setCategoriesWithCounts] = useState(categories);

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await getCategories();

      setCategoriesWithCounts(prevCategories =>
        prevCategories.map(category => {
          const matchingCategory = data.data.categories.find(
            apiCategory =>
              apiCategory.name &&
              apiCategory.name.toLowerCase() === category.title.toLowerCase(),
          );
          return {
            ...category,
            coursesCount: matchingCategory
              ? matchingCategory.courseCount || 0
              : 0,
          };
        }),
      );
    } catch (err) {
      console.log('Error while loading categories', err);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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
            <div className={styles.title}>
              ისწავლე, განვითარდი და მიაღწიე ჩვენთან ერთად!
            </div>
            <div className={styles.description}>
              დაეუფლე ციფრულ ტექნოლოგიებს 0-დან, ისარგებლე დაფინანსებული
              კურსებით და რაც მთავარია, ისწავლე ნებისმიერი ადგილიდან. ჩვენთან
              მიიღებ სრულყოფილ განათლებას და დასაქმების შანსს.
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
            <div
              className={styles.allCategories}
              onClick={() => navigate('/courses')}
            >
              ყველას ნახვა
            </div>
          </div>
          <div className={styles.innerContainer}>
            <div className={styles.categoriesContainer}>
              <div className={styles.ourCoursesTitleMobile}>ᲩᲕᲔᲜᲘ ᲙᲣᲠᲡᲔᲑᲘ</div>

              {categoriesWithCounts.map((category, index) => (
                <CategoryCard
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  coursesCount={category.coursesCount}
                  onClick={() => {
                    trackEvent('category_click', category.title);
                    navigate('/courses', {
                      state: { category: category.title },
                    });
                  }}
                />
              ))}
              <div
                className={styles.allCategoriesMobile}
                onClick={() => navigate('/courses')}
              >
                ყველას ნახვა
              </div>
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
              <img
                src="/assets/videoLessonsBanner.png"
                alt="videoLessonsTeam"
              />
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
                Lorem ipsum dolor sit amet consectetur. Id id sed est magnis
                est. Egestas purus at egestas nulla tellus. Egestas proin erat
                fusce turpis. Eu viverra mauris tellus aliquam.
              </div>
              <div className={styles.courseGraduateButtonContainer}>
                <button className={styles.courseGraduateButton}>
                  <div className={styles.courseGraduateButtonTitle}>
                    დაგვიტოვე კომენტარი
                  </div>
                  <div className={styles.courseGraduateButtonArrow}>
                    <CommentsButtonArrow />
                  </div>
                </button>
              </div>
            </div>
            <CourseGraduateSwiper />
          </div>
        </div>

        <div className={styles.subscribeSectionContainer}>
          <div className={styles.subscribePhotosContainer}>
            <SubscribePhoto1 />
            <SubscribePhoto2 />
            <SubscribePhoto3 />
          </div>
          <div className={styles.subscribeInfoContainer}>
            <div className={styles.subscribeTitle}>
              SUBSCRIBE FOR GET UPDATE EVERY NEW COURSES
            </div>
            <div className={styles.subscribeDescription}>
              20k+ students daily learn with Eduvi. Subscribe for new courses.
            </div>
            <SubscribeInput
              inputPlaceholder="enter your email"
              buttonName="Subscribe"
            />
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
      </div>
    </div>
  );
}
