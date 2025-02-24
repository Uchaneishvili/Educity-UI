import React, { useState } from 'react'
import styles from './Card.module.css'
import { Divider } from '../icons'
import { ClockIcon, StudentIcon, NarrowColoredStar, WishlistIcon } from '../icons'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import useRefState from '../../../hooks/useRefState'
import { addToWishlist, removeFromWishlist } from '../../../services/wishlist.service'
export function Card({
  id,
  title,
  totalDuration,
  enrolledStudentsQuantity,
  totalReviews,
  showWishlist,
  showDivider,
  showBuy,
  buttonName,
  bordered,
  price,
  discountedPrice,
  isInWishlist,
  thumbnail
}) {
  const [isActiveRef, setIsActive] = useRefState(isInWishlist)
  const navigate = useNavigate()

  const handleWishlistClick = async () => {
    try {
      if (isActiveRef.current) {
        await addToWishlist(id)
      } else {
        await removeFromWishlist(id)
      }
    } catch (err) {
      console.error(err, 'error while adding to wishlist')
    }
  }
  return (
    <div className={`${styles.container}`}>
      <div className={styles.imageContainer}>
        <img
          className={styles.cardImageWeb}
          alt={title}
          // src="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
          src={thumbnail}
        />

        <img className={styles.cardImageMobile} alt={title} src={thumbnail} />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            {title && <div className={styles.title}>{title}</div>}

            {(totalDuration || enrolledStudentsQuantity || totalReviews) && (
              <div className={styles.info}>
                {totalDuration && (
                  <div className={styles.durationInfo}>
                    <span>
                      <ClockIcon />
                    </span>
                    {totalDuration} თვე
                  </div>
                )}

                {enrolledStudentsQuantity && (
                  <div className={styles.studentsInfo}>
                    <span>
                      <StudentIcon />
                    </span>
                    {enrolledStudentsQuantity} სტუდენტი
                  </div>
                )}

                {totalReviews && (
                  <div className={styles.reviewInfo}>
                    <span>
                      <NarrowColoredStar />
                    </span>
                    {totalReviews}
                  </div>
                )}
              </div>
            )}
          </div>

          {showWishlist && (
            <div className={styles.wishListButtonContainer}>
              <button
                className={styles.wishListButton}
                onClick={async () => {
                  setIsActive(!isActiveRef.current)
                  await handleWishlistClick()
                }}
              >
                <WishlistIcon isActive={isActiveRef.current} />
              </button>
            </div>
          )}
        </div>

        {showDivider && <Divider />}

        {showBuy ? (
          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              {discountedPrice && (
                <div className={`${styles.price} ${styles.priceDetails}`}>{price} ₾</div>
              )}

              <div className={`${styles.discountedPrice} ${styles.discountedPriceDetails}`}>
                {discountedPrice ? discountedPrice : price} ₾
              </div>
            </div>

            <div className={styles.detailsContainer}>
              <Button> {buttonName}</Button>
            </div>
          </div>
        ) : (
          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              {discountedPrice && <div className={styles.price}>{price} ₾</div>}

              <div className={styles.discountedPrice}>
                {discountedPrice ? discountedPrice : price} ₾
              </div>
            </div>

            <div className={styles.detailsContainer}>
              <div className={styles.details} onClick={() => navigate(`/courses/${id}`)}>
                დეტალები
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
