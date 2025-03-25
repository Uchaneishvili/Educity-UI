import React, { useCallback, useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import CardListItem from '../../components/UI/CardListItem/CardListItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { getCourseDetails } from '../../services/courses.service';
import { Loader } from '../../components/UI/Loader/Loader';
import { purchaseCourse } from '../../services/purchase.service';
import GTMHelper from '../../utils/GTMHelper';

function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCourseDetails(id);
      setData(response.data);

      // Track checkout view
      GTMHelper.event('begin_checkout', {
        items: [
          {
            item_id: response.data._id,
            item_name: response.data.title,
            price: response.data.discountedPrice || response.data.price,
            currency: 'GEL',
          },
        ],
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const payForCourse = async () => {
    try {
      // Track payment initiation
      GTMHelper.event('add_payment_info', {
        items: [
          {
            item_id: data._id,
            item_name: data.title,
            price: data.discountedPrice || data.price,
            currency: 'GEL',
          },
        ],
      });

      const response = await purchaseCourse(id);

      if (response.status === 201) {
        // Track successful checkout redirect
        GTMHelper.event('checkout_progress', {
          step: 1,
          items: [
            {
              item_id: data._id,
              item_name: data.title,
              price: data.discountedPrice || data.price,
              currency: 'GEL',
            },
          ],
        });
        window.location.href = response.data.checkoutUrl;
      }
    } catch (err) {
      console.log('error while paying for course', err);
      // Track checkout error
      GTMHelper.event('checkout_error', {
        error_message: err.message,
        course_id: id,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log('88', data);
  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.checkoutTitle}>Checkout</div>
        <div className={styles.checkoutNavigationContainer}>
          <div onClick={() => navigate('/')}>Home</div>
          <div>/</div>
          <div>Checkout</div>
        </div>
        {loading ? (
          <Loader />
        ) : data ? (
          <div className={styles.shoppingCartContainer}>
            <div className={styles.shoppingCardsContainer}>
              <div className={styles.shoppingCartTitle}>Shopping Cart (1)</div>

              <div className={styles.shoppingCardContainer}>
                <CardListItem
                  img={data.thumbnail}
                  reviewScore={data.averageRating}
                  reviewNumber={data.totalReviews}
                  name={data.title}
                  author={data.instructorName}
                  showBuy={true}
                  hideBuyButton={true}
                />
              </div>
            </div>

            <div className={styles.shoppingPricesContainer}>
              <div className={styles.orderSummaryContainer}>
                <div className={styles.orderSummaryTitle}>Order Summary</div>
              </div>

              <div className={styles.checkoutTotalPriceContainer}>
                <div>Total:</div>
                <div>
                  {data.discountedPrice ? data.discountedPrice : data.price} ₾
                </div>
              </div>

              <div className={styles.checkoutButtonContainer}>
                <Button
                  type="primary"
                  width="100%"
                  onClick={() => {
                    payForCourse();
                  }}
                >
                  კურსის შეძენა
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>No course data available</div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
