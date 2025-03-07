import React from 'react';
import styles from './PurchaseHistory.module.css';
import CardListItem from '../../../../components/UI/CardListItem/CardListItem';
import Pagination from '../../../../components/UI/Pagination/Pagination';
import { getPurchaseHistory } from '../../../../services/purchase.service';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../../../../components/UI/Loader/Loader';
function PurchaseHistory() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getPurchaseHistory();
      setData(data.data.purchases);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      setLoading(false);
      console.log('error in loadData', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.map(item => (
            <CardListItem
              key={item.id}
              img={item.courseId?.thumbnail}
              reviewScore={item.courseId?.rating}
              reviewNumber={item.courseId?.reviews_count}
              name={item.courseId?.title}
              author={item.courseId?.instructorName}
              price={item.courseId?.price}
              oldPrice={item.courseId?.old_price}
              showPrice={true}
            />
          ))}

          {totalPages > 10 && <Pagination />}
        </>
      )}
    </div>
  );
}

export default PurchaseHistory;
