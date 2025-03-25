import React, { useState, useCallback, useEffect } from 'react';
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
import { Loader } from '../../../../../../../components/UI/Loader/Loader';
import { FormatData } from '../../../../../../../utils/FormatData';
function CourseReview() {
  const { id } = useParams();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [starsAmount, setStarsAmount] = useState(0);
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [ratingStats, setRatingStats] = useState();
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const addReview = async e => {
    e.preventDefault(); // Prevent default form submission
    try {
      await addReviewToCourse(id, {
        rating: starsAmount,
        comment: comment,
      });

      setIsReviewOpen(false);
      loadReviews(currentPage); // Reload reviews after adding a new one
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const loadReviews = useCallback(
    async (page = 0) => {
      try {
        setLoading(true);
        console.log('***', id);
        const query = {
          staticFilter: {
            courseId: id,
          },
          page,
          pageSize,
        };

        const { data } = await getReviewsById(query);
        console.log('response', data);
        setData(data.data.reviews);
        setTotalItems(data.data.totalCount);
        setRatingStats(data.data.ratingStats);

        console.log('ratingStats', data.data.ratingStats);
      } catch (error) {
        console.error('Error loading reviews:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [id, pageSize],
  );

  useEffect(() => {
    loadReviews(currentPage);
  }, [loadReviews, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.courseReviewHeaderContainer}>
            <div>
              <div className={styles.reviewPoint}>
                {ratingStats?.averageRating || 0.0}
              </div>
              <div>
                <Feedback starsAmount={ratingStats?.averageRating || 0} />
                <div className={styles.reviewAmount}>
                  based on {totalItems} ratings
                </div>
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
            {[5, 4, 3, 2, 1].map(starCount => (
              <div
                className={styles.reviewPercentageTabContainer}
                key={starCount}
              >
                <Feedback starsAmount={starCount} />
                <div className={styles.reviewPercentage}>
                  {ratingStats?.ratingPercentages?.[starCount] || 0}%
                </div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{
                      width: `${
                        ratingStats?.ratingPercentages?.[starCount] || 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.reviewPeopleContainer}>
            {data.map(d => (
              <div className={styles.reviewPersonContainer} key={d._id}>
                <div className={styles.reviewPersonPhotoContainer}>
                  <img
                    src={d.userId.image || '/assets/userAvatar.png'}
                    alt="personAvatar"
                  />
                </div>
                <div className={styles.reviewPersonCommentContainer}>
                  <div className={styles.reviewPersonCommentInfo}>
                    <div className={styles.reviewPersonCommentName}>
                      {d.userId.fullName}
                    </div>
                    <div className={styles.reviewPersonCommentDate}>
                      {FormatData.formatDateTime(d.createdAt)}
                    </div>
                  </div>
                  <div className={styles.reviewPersonComment}>{d.comment}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paginationContainer}>
            {totalItems > pageSize && (
              <Pagination
                totalItems={totalItems}
                pageSize={pageSize}
                currentPage={currentPage}
                pathPrefix={`/courses/${id}/reviews`}
                onPageChange={page => {
                  setCurrentPage(page);
                  loadReviews(page);
                }}
              />
            )}
          </div>

          <Modal isOpen={isReviewOpen} width="650px">
            <div className={styles.reviewModalHeaderContainer}>
              <div className={styles.reviewModalHeaderTitle}>
                Write a Review
              </div>
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
      )}
    </>
  );
}

export default CourseReview;
