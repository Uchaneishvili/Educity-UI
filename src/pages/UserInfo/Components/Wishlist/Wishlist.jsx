import React, { useState, useEffect } from 'react'
import styles from './Wishlist.module.css'
import CardListItem from '../../../../components/UI/CardListItem/CardListItem'
import Pagination from '../../../../components/UI/Pagination/Pagination'
import { getWishlist } from '../../../../services/wishlist.service'
import { Loader } from '../../../../components/UI/Loader/Loader'
function Wishlist() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const response = await getWishlist()
      console.log(response)
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        data.map((item) => {
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
          )
        })
      )}
    </div>
  )
}

export default Wishlist
