import { Card } from '../../components/UI/Card/Card'
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import styles from './Courses.module.css'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useEffect, useState, useCallback } from 'react'
import { getCourses } from '../../services/courses.service'
import { getCategories } from '../../services/categories.service'
import CategoriesList from './components/Categories/CategoriesList'
import Reviews from './components/Reviews/Reviews'

export function Courses() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedReviews, setSelectedReviews] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 10

  const loadData = useCallback(
    async (page = 1) => {
      try {
        const query = {
          page,
          pageSize,
          filters: {
            avgRating: selectedReviews,
            categoryId: selectedCategories
          },
          customSearch: searchQuery ? { search: searchQuery } : undefined
        }

        const response = await getCourses(query)
        setCourses(response.data.items)
        setTotalItems(response.data.totalItems)
      } catch (error) {
        console.error('Error loading courses:', error)
      }
    },
    [selectedCategories, pageSize, selectedReviews, searchQuery]
  )
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categoriesRes = await getCategories()
        setCategories(categoriesRes.data.categories)
      } catch (err) {
        console.error(err, 'error while loading categories')
      }
    }
    loadInitialData()
    loadData()
  }, [loadData])

  useEffect(() => {
    loadData(currentPage)
  }, [selectedCategories, selectedReviews, currentPage, searchQuery, loadData])

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
                totalReviews={course.totalReviews}
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
                  setCurrentPage(page)
                  loadData(page)
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
