import React, { useEffect, useState } from 'react';
import styles from './CoursesTab.module.css';
import Pagination from '../../../../components/UI/Pagination/Pagination';
import { Card } from '../../../../components/UI/Card/Card';
import { getMyCourses } from '../../../../services/courses.service';
import { useAuth } from '../../../../context/AuthContext';

function CoursesTab({ hideTitle }) {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const loadData = async () => {
    try {
      const res = await getMyCourses();

      console.log('res', res.data.data.courses);
      setData(res.data.data.courses);
      setTotalItems(res.data.data.totalCount);
    } catch (err) {
      console.log('Error in loadData', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.coursesContainer}>
      <div
        className={styles.coursesTitle}
        style={{ display: hideTitle ? 'none' : 'block' }}
      >
        Let's start learning, {user.fullName}
      </div>

      <div className={styles.cardsContainer}>
        {data.map(course => (
          <Card
            key={course._id}
            id={course._id}
            thumbnail={course.thumbnail}
            title={course.title}
            totalDuration={course.totalDuration}
            enrolledStudentsQuantity={course.enrolledStudentsQuantity}
            totalReviews={course.averageRating}
            price={course.price}
            discountedPrice={course.discountedPrice}
          />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        {totalItems > pageSize && (
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            pathPrefix="/courses"
            onPageChange={page => {
              setCurrentPage(page);
              loadData(page);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CoursesTab;
