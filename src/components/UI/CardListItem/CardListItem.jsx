import React from 'react';
import styles from './CardListItem.module.css';
import { ColoredStar, WishlistIcon } from '../../UI/icons';
import { Button } from '../Button/Button';

function CardListItem({
  img,
  reviewScore,
  reviewNumber,
  name,
  author,
  discountedPrice,
  price,
  showBuy,
  hideBuyButton,
  showPrice,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.cardListDescriptionContainer}>
        <div className={styles.cardListImgContainer}>
          <img src={img} alt="cardListBanner" />
        </div>
        <div className={styles.cardListTextsContainer}>
          <div className={styles.cardListTextsInnerContainer}>
            {reviewNumber > 0 && (
              <div className={styles.cardListReviewContainer}>
                <ColoredStar />
                <div className={styles.cardListReviewScore}>{reviewScore}</div>
                <div className={styles.cardListReviewNumber}>
                  ({reviewNumber} შეფასება)
                </div>
              </div>
            )}

            <div className={styles.cardListName}>{name}</div>
          </div>
          <div className={styles.cardListAuthor}>
            <div>Course by:</div>
            <div>{author}</div>
          </div>
        </div>
      </div>
      <div className={styles.cardListPricesAndButtonsContainer}>
        {showPrice && (
          <div className={styles.cardListPricesContainer}>
            <div className={styles.cardListPrice}>
              {discountedPrice ? discountedPrice : price} ₾
            </div>
            {discountedPrice && (
              <div className={styles.cardListOldPrice}>{price} ₾</div>
            )}
          </div>
        )}

        {showBuy && (
          <div className={styles.cardListButtonsContainer}>
            {hideBuyButton ? (
              <></>
            ) : (
              <Button type="primary">კურსის შეძენა</Button>
            )}

            <div className={styles.cardWishListButtonContainer}>
              <button className={styles.cardWishListButton}>
                <WishlistIcon isActive={true} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardListItem;
