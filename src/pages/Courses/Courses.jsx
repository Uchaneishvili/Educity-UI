import { Card } from '../../components/UI/Card/Card'
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import styles from './Courses.module.css'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useEffect, useState, useCallback } from 'react'
import { getCourses } from '../../services/courses.service'
import { getCategories } from '../../services/categories.service'
import CategoriesList from './components/Categories/CategoriesList'
import Reviews from './components/Reviews/Reviews'
import { Loader } from '../../components/UI/Loader/Loader'

const cards = [
  {
    _id: 1,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  },
  {
    _id: 2,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  },
  {
    _id: 3,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  },
  {
    _id: 4,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  },
  {
    _id: 5,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  },
  {
    _id: 6,
    title: 'UI/UX დიზაინის კურსი',
    review: 9.8,
    enrolledStudentsQuantity: 20,
    totalDuration: 2,
    discountedPrice: 200,
    price: 250,
    averageRating: 5
  }
]

const categoriesList = [
  {
    _id: 4,
    name: 'დიზაინი'
  },
  {
    _id: 5,
    name: 'პროგრამირება'
  },
  {
    _id: 6,
    name: 'მარკეტინგი'
  }
]

export function Courses() {
  const [courses, setCourses] = useState(cards)
  const [categories, setCategories] = useState(categoriesList)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedReviews, setSelectedReviews] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 10
  const [loading, setLoading] = useState(true)

  // const loadData = useCallback(
  //   async (page = 1) => {
  //     try {
  //       setLoading(true)

  //       const query = {
  //         page,
  //         pageSize,
  //         filters: {
  //           avgRating: selectedReviews,
  //           categoryId: selectedCategories
  //         },
  //         customSearch: searchQuery ? { search: searchQuery } : undefined
  //       }

  //       const response = await getCourses(query)
  //       setCourses(response.data.items)
  //       setTotalItems(response.data.total)
  //     } catch (error) {
  //       console.error('Error loading courses:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   },
  //   [selectedCategories, pageSize, selectedReviews, searchQuery]
  // )
  // useEffect(() => {
  //   const loadInitialData = async () => {
  //     try {
  //       const categoriesRes = await getCategories()
  //       setCategories(categoriesRes.data.categories)
  //     } catch (err) {
  //       console.error(err, 'error while loading categories')
  //     }
  //   }

  //   loadInitialData()
  //   loadData()
  // }, [loadData])

  // useEffect(() => {
  //   loadData(currentPage)
  // }, [selectedCategories, selectedReviews, currentPage, searchQuery, loadData])

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories)
  }

  const handleReviewChange = (reviews) => {
    setSelectedReviews(reviews)
    setCurrentPage(1)
  }

  const handleSearch = (value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  // if (loading) {
  //   return (
  //     <div className={styles.loaderContainer}>
  //       <Loader />
  //     </div>
  //   )
  // }

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <div className={styles.filterContainer}>
            <div className={styles.filterTitle}>კატეგორიები</div>
            <CategoriesList data={categories} onCategoryChange={handleCategoryChange} />
            <Reviews onReviewChange={handleReviewChange} />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>ჩვენი კურსები</div>
            <div className={styles.searchContainer}>
              <SearchInput onChange={handleSearch} />
            </div>
          </div>
          <div className={styles.content}>
            {courses.map((course, index) => (
              <Card
                id={course._id}
                key={course._id || index}
                bordered={true}
                title={course.title}
                totalDuration={course.totalDuration}
                enrolledStudentsQuantity={course.enrolledStudentsQuantity}
                totalReviews={course.averageRating}
                price={course.price}
                showWishlist={true}
                discountedPrice={course.discountedPrice}
              />
            ))}
          </div>

          <div className={styles.paginationContainer}>
            {totalItems > pageSize && (
              <Pagination
                totalItems={totalItems}
                pageSize={pageSize}
                currentPage={currentPage}
                pathPrefix="/courses"
                onPageChange={(page) => {
                  // setCurrentPage(page)
                  // loadData(page)
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
