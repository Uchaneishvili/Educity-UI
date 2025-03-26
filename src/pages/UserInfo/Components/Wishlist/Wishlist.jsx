import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.css';
import CardListItem from '../../../../components/UI/CardListItem/CardListItem';
import Pagination from '../../../../components/UI/Pagination/Pagination';
import { getWishlist } from '../../../../services/wishlist.service';
import { Loader } from '../../../../components/UI/Loader/Loader';
function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

  const loadData = async () => {
    try {
      const response = await getWishlist();
      setData(response.data);
      setTotalItems(response.data.totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        data.map(item => {
          return (
            <CardListItem
              img={item.thumbnail}
              reviewScore={item.averageRating}
              reviewNumber={item.enrolledStudentsQuantity}
              name={item.title}
              author="ვაკო ვაკო"
              price={item.price}
              oldPrice={item.discountedPrice}
              showBuy={true}
              showPrice={true}
            />
          );
        })
      )}

      <div className={styles.paginationContainer}>
        {totalItems > pageSize && (
          <Pagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            pathPrefix="/courses"
            onPageChange={page => {
              setCurrentPage(page);
              loadData(page);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Wishlist;
