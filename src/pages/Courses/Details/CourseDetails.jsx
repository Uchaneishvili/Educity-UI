import styles from './CourseDetails.module.css';
import {
  ClockIcon,
  StudentIcon,
  LectureIcon,
  LevelIcon,
} from '../../../components/UI/icons';
import { Card } from '../../../components/UI/Card/Card';
import TabSections from './components/TabSections/TabSections';
import {
  getCourseDetails,
  checkAccess,
} from '../../../services/courses.service';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Loader } from '../../../components/UI/Loader/Loader';
import { Error } from '../../../components/Error/Error';
import { useAuth } from '../../../context/AuthContext';
import FormatData from '../../../utils/FormatData';
export function CourseDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCourseDetails(id);
      setData(res.data);
    } catch (error) {
      console.error('Error loading course details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkingUserAccess = useCallback(async () => {
    try {
      const res = await checkAccess(id);
      setAccess(res.data.hasAccess);
    } catch (error) {
      console.error('Error loading course details:', error);
    }
  }, [id]);

  useEffect(() => {
    if (isAuthenticated) {
      checkingUserAccess();
    }
  }, [checkingUserAccess, isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <Error />;
  }

  const buttonName = () => {
    const isOnline = data.type === 'video-lecture';

    if (access) {
      return isOnline ? 'კურსზე გადასვლა' : 'კურსი უკვე შეძენილი გაქვთ';
    } else {
      return isOnline ? 'კურსის შეძენა' : 'კურსზე რეგისტრაცია';
    }
  };

  return (
    <>
      <div className={`${styles.container} mainContainer`}>
        <div className={styles.innerContainer}>
          <div className={styles.lecturerContainer}>
            <div className={styles.categoryButton}>{data.categoryId?.name}</div>
            ლექტორი: {data.instructorName}
          </div>

          <div className={styles.titleContainer}>{data.title}</div>

          <div className={styles.shortInfoContainer}>
            <div className={styles.duration}>
              <ClockIcon /> {data.totalDuration || ''}
            </div>
            <div className={styles.studentsQuantity}>
              <StudentIcon /> {data.enrollmentsCount || ''} სტუდენტი
            </div>
            <div className={styles.level}>
              <LevelIcon />{' '}
              {FormatData.getDifficultyInGeorgian(data.difficultyLevel)}
            </div>
            {/* <div className={styles.lecturesQuantity}>
              <LectureIcon /> {data.lecturesCount || ''} ლექცია
            </div> */}
          </div>
        </div>
      </div>
      <div className={`${styles.descriptionContainer} mainContainer`}>
        <div className={styles.cardContainer}>
          <Card
            showBuy={true}
            buttonName={buttonName()}
            ButtonDisabled={Boolean(access && data.type !== 'video-lecture')}
            thumbnail={data.thumbnail}
            title={data.title}
            discountedPrice={data.discountedPrice}
            price={data.price}
            intro={data.intro}
            onClick={() => {
              const isOnline = data.type === 'video-lecture';
              if (access) {
                if (isOnline) {
                  navigate(`/courses/${id}/videos`);
                }
              } else {
                if (isOnline) {
                  navigate(`/checkout/${id}`);
                } else {
                  navigate(`/register/${id}`);
                }
              }
            }}
          />
        </div>
        <div className={styles.tabSelectorContainer}>
          <TabSections
            tabs={[
              { id: 0, label: 'კურსის შესახებ' },
              { id: 1, label: 'სილაბუსი' },
              { id: 2, label: 'შეფასება' },
            ]}
            description={data.description}
          />
        </div>
      </div>
    </>
  );
}
