import React, { useState } from 'react';
import styles from './CourseReview.module.css';
import { Feedback } from '../../../../../../../components/UI/Feedback/Feedback';
import Pagination from '../../../../../../../components/UI/Pagination/Pagination';
import Modal from '../../../../../../../components/UI/Modal/Modal';
import { CloseIcon } from '../../../../../../../components/UI/icons';
import { ReviewModalColoredStar } from '../../../../../../../components/UI/icons';
import { ReviewModalUncoloredStar } from '../../../../../../../components/UI/icons';
import { Button } from '../../../../../../../components/UI/Button/Button';
import { SubmitBtnArrow } from '../../../../../../../components/UI/icons';
import { useParams } from 'react-router-dom';
import TextArea from '../../../../../../../components/UI/Textarea/Textarea';
import { addReviewToCourse } from '../../../../../../../services/review.service';
import { useAuth } from '../../../../../../../context/AuthContext';
import { getReviewsById } from '../../../../../../../services/review.service';
function CourseReview() {
  const { id } = useParams();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [starsAmount, setStarsAmount] = useState(0);
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await getReviewsById(id);
      setData(response.data.data.reviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const reviewStarsData = [
    {
      id: 1,
      stars: <Feedback starsAmount="5" />,
      percentage: '90%',
    },
    {
      id: 2,
      stars: <Feedback starsAmount="4" />,
      percentage: '5%',
    },
    {
      id: 3,
      stars: <Feedback starsAmount="3" />,
      percentage: '2%',
    },
    {
      id: 4,
      stars: <Feedback starsAmount="2" />,
      percentage: '2%',
    },
    {
      id: 5,
      stars: <Feedback starsAmount="1" />,
      percentage: '1%',
    },
  ];

  const personCommentData = [
    {
      id: 1,
      avatar: '/assets/userAvatar.png',
      fullName: 'Laura Hipster',
      date: 'October 03, 2024',
      comment:
        'Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.',
    },
    {
      id: 2,
      avatar: '/assets/userAvatar.png',
      fullName: 'Laura Hipster',
      date: 'October 03, 2024',
      comment:
        'Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.',
    },
    {
      id: 3,
      avatar: '/assets/userAvatar.png',
      fullName: 'Laura Hipster',
      date: 'October 03, 2024',
      comment:
        'Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.',
    },
  ];

  const addReview = async e => {
    e.preventDefault(); // Prevent default form submission
    try {
      await addReviewToCourse(id, {
        rating: starsAmount,
        comment: comment,
        isPublished: false,
      });

      setIsReviewOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  return (
    <>
      <div className={styles.courseReviewHeaderContainer}>
        <div>
          <div className={styles.reviewPoint}>4.0</div>
          <div>
            <Feedback starsAmount="4" />
            <div className={styles.reviewAmount}>based on 146,951 ratings</div>
          </div>
        </div>

        {isAuthenticated && (
          <button
            type="button"
            className={styles.videoLessonsReviewBtn}
            onClick={() => setIsReviewOpen(true)}
          >
            შეფასების დაწერა
          </button>
        )}
      </div>
      <div className={styles.reviewPercentageTabsContainer}>
        {reviewStarsData.map(review => (
          <div className={styles.reviewPercentageTabContainer} key={review.id}>
            {review.stars}
            <div className={styles.reviewPercentage}>{review.percentage}</div>
            <div className={styles.reviewPercentageEmptyLine}>
              <div
                className={styles.reviewPercentageFilledLine}
                style={{ width: review.percentage }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.reviewPeopleContainer}>
        {personCommentData.map(person => (
          <div className={styles.reviewPersonContainer} key={person.id}>
            <div className={styles.reviewPersonPhotoContainer}>
              <img src={person.avatar} alt="personAvatar" />
            </div>
            <div className={styles.reviewPersonCommentContainer}>
              <div className={styles.reviewPersonCommentInfo}>
                <div className={styles.reviewPersonCommentName}>
                  {person.fullName}
                </div>
                <div className={styles.reviewPersonCommentDate}>
                  {person.date}
                </div>
              </div>
              <div className={styles.reviewPersonComment}>{person.comment}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <Pagination />
      </div>

      <Modal isOpen={isReviewOpen} width="650px">
        <div className={styles.reviewModalHeaderContainer}>
          <div className={styles.reviewModalHeaderTitle}>Write a Review</div>
          <div
            className={styles.reviewModalCloseIcon}
            onClick={() => setIsReviewOpen(false)}
          >
            <CloseIcon />
          </div>
        </div>
        <div className={styles.reviewModalMainContainer}>
          <div className={styles.reviewModalMainTitle}>
            <div className={styles.reviewModalAmount}>{starsAmount}</div>
            <div className={styles.reviewModalRate}>(Good/Amazing)</div>
          </div>
          <div className={styles.reviewModalStars}>
            {[...Array(5)].map((_, index) => (
              <div key={index} onClick={() => setStarsAmount(index + 1)}>
                {index < starsAmount ? (
                  <ReviewModalColoredStar />
                ) : (
                  <ReviewModalUncoloredStar />
                )}
              </div>
            ))}
          </div>

          <form className={styles.reviewModalFeedbackForm}>
            <TextArea
              id="reviewModalFeedback"
              name="Feedback"
              placeholder="Write down your feedback here..."
              onChange={e => setComment(e.target.value)}
            />

            <div className={styles.reviewModalFeedbackButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsReviewOpen(false)}
              >
                Cancel
              </button>

              <Button type="primary" shadow={false} onClick={addReview}>
                Submit Review <SubmitBtnArrow />
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CourseReview;
