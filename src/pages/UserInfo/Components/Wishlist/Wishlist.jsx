import React from "react";
import styles from "./Wishlist.module.css";
import CardListItem from "../../../../components/UI/CardListItem/CardListItem";
import Pagination from "../../../../components/UI/Pagination/Pagination";

function Wishlist() {
  return (
    <div className={styles.container}>
      <CardListItem
        img="https://fastly.picsum.photos/id/579/480/292.jpg?hmac=Tux53lw7zzOR1tdJuxZDjIyTSn4S-IT3n2HIXD328ek"
        reviewScore="4.6"
        reviewNumber="456,230"
        name="UI/UX Designer"
        author="ვაკო ვაკო"
        price="50$"
        oldPrice="100$"
        showBuy={true}
      />
      <CardListItem />
      <CardListItem />
      <CardListItem />

      <Pagination />
    </div>
  );
}

export default Wishlist;
