import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.css';
import CardListItem from '../../../../components/UI/CardListItem/CardListItem';
import Pagination from '../../../../components/UI/Pagination/Pagination';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../../../services/wishlist.service';
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

  const handleWishlist = async courseId => {
    try {
      if (data) {
        await removeFromWishlist(courseId._id);
        setData(prev => prev.filter(item => item.courseId !== courseId));
      } else {
        await addToWishlist(courseId._id);
      }
    } catch (err) {
      console.log(err, 'Error toggle wishlist');
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        data.map(item => {
          return (
            <CardListItem
              handleWishlist={() => handleWishlist(item.courseId)}
              isWishlist={item.courseId._id}
              img={item.courseId.thumbnail}
              reviewScore={item.courseId.averageRating}
              reviewNumber={item.courseId.enrollmentsCount}
              name={item.courseId.title}
              author={item.courseId.instructorName}
              price={item.courseId.price}
              oldPrice={item.courseId.discountedPrice}
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
