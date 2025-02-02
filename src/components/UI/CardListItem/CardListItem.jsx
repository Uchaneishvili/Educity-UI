import React from "react";
import styles from "./CardListItem.module.css";
import { ColoredStar, WishlistIcon } from "../../UI/icons";
import { Button } from "../Button/Button";

function CardListItem({
  img,
  reviewScore,
  reviewNumber,
  name,
  author,
  price,
  oldPrice,
  hideButtons,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.cardListDescriptionContainer}>
        <div className={styles.cardListImgContainer}>
          <img src={img} alt="cardListBanner" />
        </div>
        <div className={styles.cardListTextsContainer}>
          <div className={styles.cardListTextsInnerContainer}>
            <div className={styles.cardListReviewContainer}>
              <ColoredStar />
              <div className={styles.cardListReviewScore}>{reviewScore}</div>
              <div className={styles.cardListReviewNumber}>
                ({reviewNumber} Review)
              </div>
            </div>
            <div className={styles.cardListName}>{name}</div>
          </div>
          <div className={styles.cardListAuthor}>
            <div>Course by:</div>
            <div>{author}</div>
          </div>
        </div>
      </div>
      <div className={styles.cardListPricesAndButtonsContainer}>
        <div className={styles.cardListPricesContainer}>
          <div className={styles.cardListPrice}>{price}</div>
          <div className={styles.cardListOldPrice}>{oldPrice}</div>
        </div>
        <div
          className={styles.cardListButtonsContainer}
          style={{ display: hideButtons && "none" }}
        >
          <Button type="primary" children="კურსის შეძენა" />

          <div className={styles.cardWishListButtonContainer}>
            <button className={styles.cardWishListButton}>
              <WishlistIcon isActive={true} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardListItem;
