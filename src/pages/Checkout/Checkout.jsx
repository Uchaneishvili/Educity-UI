import React from "react";
import styles from "./Checkout.module.css";
import CardListItem from "../../components/UI/CardListItem/CardListItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/UI/Button/Button";

function Checkout() {
  const navigate = useNavigate();
  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.checkoutTitle}>Checkout</div>
        <div className={styles.checkoutNavigationContainer}>
          <div onClick={() => navigate("/")}>Home</div>
          <div>/</div>
          <div>Checkout</div>
        </div>

        <div className={styles.shoppingCartContainer}>
          <div className={styles.shoppingCardsContainer}>
            <div className={styles.shoppingCartTitle}>Shopping Cart (3)</div>

            <div className={styles.shoppingCardContainer}>
              <CardListItem
                img="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
                reviewScore="4.6"
                reviewNumber="456,230"
                name="UI/UX Designer"
                author="ვაკო ვაკო"
                showBuy={true}
                hideBuyButton={true}
              />
            </div>
            <div className={styles.shoppingCardContainer}>
              <CardListItem
                img="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
                reviewScore="4.6"
                reviewNumber="456,230"
                name="UI/UX Designer"
                author="ვაკო ვაკო"
                showBuy={true}
                hideBuyButton={true}
              />
            </div>
            <div className={styles.shoppingCardContainer}>
              <CardListItem
                img="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
                reviewScore="4.6"
                reviewNumber="456,230"
                name="UI/UX Designer"
                author="ვაკო ვაკო"
                showBuy={true}
                hideBuyButton={true}
              />
            </div>
          </div>

          <div className={styles.shoppingPricesContainer}>
            <div className={styles.orderSummaryContainer}>
              <div className={styles.orderSummaryTitle}>Order Summary</div>
              <div className={styles.orderSummaryPriceContainer}>
                <div>Subtotal</div>
                <div>$61.97 USD</div>
              </div>
              <div className={styles.orderSummaryPriceContainer}>
                <div>Coupon Discount</div>
                <div>8%</div>
              </div>
            </div>

            <div className={styles.checkoutTotalPriceContainer}>
              <div>Total:</div>
              <div>$75.00 USD</div>
            </div>

            <div className={styles.checkoutButtonContainer}>
              <Button type="primary" width="100%">
                კურსის შეძენა
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
