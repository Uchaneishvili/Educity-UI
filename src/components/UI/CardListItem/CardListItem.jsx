import React from "react";
import styles from "./CardListItem.module.css";
import { ColoredStar, WishlistIcon } from "../../UI/icons";
import { Button } from "../Button/Button";

function CardListItem() {
  return (
    <div className={styles.container}>
      <div className={styles.cardListDescriptionContainer}>
        <div className={styles.cardListImgContainer}>
          <img
            src="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
            alt="cardListBanner"
          />
        </div>
        <div className={styles.cardListTextsContainer}>
          <div className={styles.cardListTextsInnerContainer}>
            <div className={styles.cardListReviewContainer}>
              <ColoredStar />
              <div className={styles.cardListReviewScore}>4.6</div>
              <div className={styles.cardListReviewNumber}>
                (451,444 Review)
              </div>
            </div>
            <div className={styles.cardListName}>UI/UX დიზაინის კურსი</div>
          </div>
          <div className={styles.cardListAuthor}>
            <div>Course by:</div>
            <div>მარიამ რთველაძე</div>
          </div>
        </div>
      </div>
      <div className={styles.cardListPricesAndButtonsContainer}>
        <div className={styles.cardListPricesContainer}>
          <div className={styles.cardListPrice}>$37.00</div>
          <div className={styles.cardListOldPrice}>$49.00</div>
        </div>
        <div className={styles.cardListButtonsContainer}>
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
