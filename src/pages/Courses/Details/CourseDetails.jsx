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
import GTMHelper from '../../../utils/GTMHelper';

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

      // Track course view event
      GTMHelper.event('view_item', {
        items: [
          {
            item_id: res.data._id,
            item_name: res.data.title,
            price: res.data.price,
            discount: res.data.discountedPrice
              ? res.data.price - res.data.discountedPrice
              : 0,
            item_category: res.data.categoryName,
          },
        ],
      });
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
      console.log('isAuthenticated', isAuthenticated);
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

  const handleCourseAction = () => {
    const isOnline = data.type === 'video-lecture';
    if (access) {
      if (isOnline) {
        GTMHelper.event('start_course', {
          course_id: id,
          course_name: data.title,
        });
        navigate(`/courses/${id}/videos`);
      }
    } else {
      if (isOnline) {
        GTMHelper.event('begin_checkout', {
          course_id: id,
          course_name: data.title,
          price: data.discountedPrice || data.price,
        });
        navigate(`/checkout/${id}`);
      } else {
        GTMHelper.event('register_for_course', {
          course_id: id,
          course_name: data.title,
        });
        navigate(`/register/${id}`);
      }
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
            ButtonDisabled={Boolean(access && data.type !== 'video-lecture')}
            thumbnail={data.thumbnail}
            title={data.title}
            discountedPrice={data.discountedPrice}
            price={data.price}
            intro={data.intro}
            onClick={handleCourseAction}
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
