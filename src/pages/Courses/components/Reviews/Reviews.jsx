import React, { useState } from 'react'
import styles from './Reviews.module.css'
import { Feedback } from '../../../../components/UI/Feedback/Feedback'
import Checkbox from '../../../../components/UI/Checkbox/Checkbox'

const Reviews = ({ onReviewChange }) => {
  const [selectedReviews, setSelectedReviews] = useState([])

  const reviews = [
    { id: 5, stars: 5 },
    { id: 4, stars: 4 },
    { id: 3, stars: 3 },
    { id: 2, stars: 2 },
    { id: 1, stars: 1 }
  ]

  const handleCheckboxChange = (reviewId) => {
    const updatedReviews = selectedReviews.includes(reviewId)
      ? selectedReviews.filter((id) => id !== reviewId)
      : [...selectedReviews, reviewId]

    setSelectedReviews(updatedReviews)
    onReviewChange(updatedReviews)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Review</div>
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <Checkbox
              checked={selectedReviews.includes(review.id)}
              onChange={() => handleCheckboxChange(review.id)}
            />
            <div className={styles.stars}>
              <Feedback starsAmount={review.stars} />
            </div>
            <div className={styles.count}>({review.stars})</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
