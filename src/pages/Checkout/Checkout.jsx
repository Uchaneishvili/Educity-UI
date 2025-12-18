import { useCallback, useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import CardListItem from '../../components/UI/CardListItem/CardListItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/UI/Button/Button';
import { getCourseDetails } from '../../services/courses.service';
import { Loader } from '../../components/UI/Loader/Loader';
import {
  applyPromoCourse,
  purchaseCourse,
} from '../../services/purchase.service';
import { trackEvent } from '../../utils/ClarityTracking';
import Input from '../../components/UI/Input/Input';
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../../services/wishlist.service';
import { useAuth } from '../../context/AuthContext';

function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  const { isAuthenticated } = useAuth();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCourseDetails(id);
      setData(response.data);

      setFinalPrice(response.data.discountedPrice || response.data.price);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getWishlistData = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        setWishlist([]);
        return;
      }
      const response = await getWishlist();
      setWishlist(response.data);
    } catch (err) {
      console.error(err, 'error while getting wishlist');
    }
  }, [isAuthenticated]);

  const handleWishlist = async course => {
    try {
      const isInWishlist = wishlist.some(
        item => item.courseId._id === course._id,
      );

      if (isInWishlist) {
        await removeFromWishlist(course._id);
        await getWishlistData();

        setWishlist(prev =>
          prev.filter(item => item.courseId._id !== course._id),
        );
      } else {
        const response = await addToWishlist(course._id);
        await getWishlistData();

        setWishlist(prev => [...prev, response.data]);
      }
    } catch (err) {
      console.log(err, 'Error toggle wishlist');
    }
  };

  const applyPromo = async () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    try {
      const response = await applyPromoCourse(id, promoCode, finalPrice);

      setFinalPrice(response.data.discountedPrice);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Invalid promo code');
      setFinalPrice(data.discountedPrice || data.price);
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const payForCourse = async () => {
    try {
      trackEvent('course_purchase_initiated', data?.title || id);
      const response = await purchaseCourse(id, promoCode);

      if (response.status === 201) {
        trackEvent('course_purchase_redirect', data?.title || id);
        window.location.href = response.data.checkoutUrl;
      }

      if (response.status === 400) {
        setErrorMessage('თქვენ უკვე გაქვთ შეძენილი ეს კურსი!');
      }
    } catch (err) {
      console.log('error while paying for course', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    getWishlistData();
  }, [getWishlistData]);

  if (loading) return <Loader />;

  if (!data) return <div>კურსები ვერ მოიძებნა!</div>;

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
                  handleWishlist={() => handleWishlist(data)}
                  isWishlist={wishlist.some(
                    item => item.courseId._id === data._id,
                  )}
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
                <Input
                  type="text"
                  id="promocode"
                  placeholder="პრომოკოდი"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                />
                <Button
                  type="secondary"
                  width="100%"
                  onClick={applyPromo}
                  disabled={isApplyingPromo}
                >
                  პრომოკოდის დადასტურება
                </Button>
              </div>

              <div className={styles.checkoutTotalPriceContainer}>
                <div>Total:</div>
                <div>{finalPrice} ₾</div>
              </div>

              <div className={styles.checkoutErrorMessage}>{errorMessage}</div>

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
          <div>კურსები ვერ მოიძებნა!</div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
