import React from "react";
import styles from "./Wishlist.module.css";
import CardListItem from "../../../../components/UI/CardListItem/CardListItem";
import Pagination from "../../../../components/UI/Pagination/Pagination";

function Wishlist() {
  return (
    <div className={styles.container}>
      <CardListItem />
      <CardListItem />
      <CardListItem />
      <CardListItem />

      <Pagination />
    </div>
  );
}

export default Wishlist;
