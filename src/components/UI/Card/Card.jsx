import React, { useState } from 'react'
import styles from './Card.module.css'
import { Divider } from '../icons'
import { ClockIcon, StudentIcon, NarrowColoredStar, WishlistIcon } from '../icons'
export function Card({ title, duration, studentsQuantity, review }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.cardImageWeb}
          alt={title}
          src="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
        />

        <img
          className={styles.cardImageMobile}
          alt={title}
          src="https://fastly.picsum.photos/id/668/358/210.jpg?hmac=0fczd3RLzyOxNWrnrJIfE8XA3rdi1iypfbN8aZn8kL0"
        />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.info}>
              <div className={styles.durationInfo}>
                <span>
                  <ClockIcon />
                </span>
                {duration}თვე
              </div>
              <div className={styles.studentsInfo}>
                <span>
                  <StudentIcon />
                </span>
                {studentsQuantity} სტუდენტი
              </div>
              <div className={styles.reviewInfo}>
                <span>
                  <NarrowColoredStar />
                </span>
                {review}
              </div>
            </div>
          </div>
          <div className={styles.wishListButtonContainer}>
            <button className={styles.wishListButton} onClick={() => setIsActive(!isActive)}>
              <WishlistIcon isActive={isActive} />
            </button>
          </div>
        </div>

        <Divider />
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <div className={styles.price}>200₾</div>
            <div className={styles.discountedPrice}>200₾</div>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.details}>დეტალები</div>
          </div>
        </div>
      </div>
    </div>
  )
}
