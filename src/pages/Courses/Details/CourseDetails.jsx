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
export function CourseDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

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
      setAccess(res.hasAccess);
    } catch (error) {
      console.error('Error loading course details:', error);
    }
  }, [id]);

  useEffect(() => {
    checkingUserAccess();
  }, [checkingUserAccess]);

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
    const isOnline = data.type === 'online';

    if (access) {
      return isOnline ? 'კურსზე გადასვლა' : 'კურსი უკვე შეძენილი გაქვთ';
    } else {
      return isOnline ? 'ყიდვა' : 'კურსზე რეგისტრაცია';
    }
  };

  return (
    <>
      <div className={`${styles.container} mainContainer`}>
        <div className={styles.innerContainer}>
          <div className={styles.lecturerContainer}>
            <div className={styles.categoryButton}>
              {data.category?.name || 'დიზაინი'}
            </div>
            ლექტორი: {data.lecturer?.fullName || 'მარიამ რთველაძე'}
          </div>

          <div className={styles.titleContainer}>{data.title}</div>

          <div className={styles.shortInfoContainer}>
            <div className={styles.duration}>
              <ClockIcon /> {data.totalDuration || ''}
            </div>
            <div className={styles.studentsQuantity}>
              <StudentIcon /> {data.enrolledStudentsCount || ''} სტუდენტი
            </div>
            <div className={styles.level}>
              <LevelIcon /> {data.difficultyLevel || ''}
            </div>
            <div className={styles.lecturesQuantity}>
              <LectureIcon /> {data.lecturesCount || ''} ლექცია
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.descriptionContainer} mainContainer`}>
        <div className={styles.cardContainer}>
          <Card
            showBuy={true}
            buttonName={buttonName()}
            thumbnail={data.thumbnail}
            title={data.title}
            discountedPrice={data.discountedPrice}
            price={data.price}
            introVideo={true}
            onClick={() => {
              const isOnline = data.type === 'online';

              if (access) {
                if (isOnline) {
                  navigate(`/course/${id}/videos`);
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
