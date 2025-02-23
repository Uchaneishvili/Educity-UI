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
import { getWishlist } from '../../services/wishlist.service'
import { useDebounce } from '../../hooks/useDebounce'

export function Courses() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedReviews, setSelectedReviews] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const pageSize = 10
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  const [coursesLoading, setCoursesLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState([])

  const loadData = useCallback(
    async (page = 1) => {
      try {
        setCoursesLoading(true)

        const query = {
          page,
          pageSize,
          filters: {
            avgRating: selectedReviews,
            categoryId: selectedCategories,
            courseType: selectedFilter
          },
          customSearch: searchQuery ? { search: searchQuery } : undefined
        }

        const response = await getCourses(query)

        setCourses(response.data.data.courses)
        setTotalItems(response.data.data.totalCount)
      } catch (error) {
        console.error('Error loading courses:', error)
      } finally {
        setCoursesLoading(false)
      }
    },
    [selectedCategories, pageSize, selectedReviews, searchQuery, selectedFilter]
  )
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const categoriesRes = await getCategories()
        setCategories(categoriesRes.data.data.categories)
      } catch (err) {
        console.error(err, 'error while loading categories')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    loadData(currentPage)
  }, [selectedCategories, selectedReviews, currentPage, searchQuery, loadData])

  const getWishlistData = async () => {
    try {
      const response = await getWishlist()
      setWishlist(response.data)
    } catch (err) {
      console.error(err, 'error while getting wishlist')
    }
  }

  useEffect(() => {
    getWishlistData()
  }, [])

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories)
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }

  const handleReviewChange = (reviews) => {
    setSelectedReviews(reviews)
    setCurrentPage(1)
  }

  const debouncedSearch = useDebounce((value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, 500)

  const handleSearch = (value) => {
    debouncedSearch(value)
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )
  }

  const data = [
    {
      name: 'აუდიტორიული',
      _id: 'offline'
    },
    {
      name: 'ჰიბრიდული',
      _id: 'hybrid'
    },
    {
      name: 'ონლაინ',
      _id: 'online'
    }
  ]

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <div className={styles.filterContainer}>
            <div className={styles.filterTitle}>მეცადინეობის ტიპი</div>
            <CategoriesList data={data} onCategoryChange={handleFilterChange} />
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
          {coursesLoading ? (
            <div className={styles.loaderContent}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles.content}>
                {courses.map((course, index) => (
                  <Card
                    id={course._id}
                    key={course._id || index}
                    bordered={true}
                    thumbnail={course.thumbnail}
                    title={course.title}
                    totalDuration={course.totalDuration}
                    enrolledStudentsQuantity={course.enrolledStudentsQuantity}
                    totalReviews={course.averageRating}
                    price={course.price}
                    showWishlist={true}
                    isInWishlist={wishlist.some((item) => item.courseId._id === course._id)}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
