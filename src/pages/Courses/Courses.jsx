import { Card } from '../../components/UI/Card/Card'
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import styles from './Courses.module.css'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useEffect, useState } from 'react'
import { getCourses } from '../../services/courses.service'
import { getCategories } from '../../services/categories.service'
import CategoriesList from './components/Categories/CategoriesList'

export function Courses() {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const pageSize = 10

  const loadData = async (page = 1) => {
    try {
      const filters = {
        categoryIds: selectedCategories
      }

      const res = await getCourses({
        page,
        pageSize,
        staticFilter: { isPublished: true },
        filters
      })

      setCourses(res.data.items)
      setTotalItems(res.data.total)
    } catch (err) {
      console.log(err, 'error while load courses')
    }
  }

  // Load initial data and categories
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categoriesRes = await getCategories()
        setCategories(categoriesRes.data.categories)
      } catch (err) {
        console.log(err, 'error while loading categories')
      }
    }
    loadInitialData()
    loadData()
  }, []) // Only run once on mount

  // Reload courses when categories selection changes
  useEffect(() => {
    loadData(currentPage)
  }, [selectedCategories, currentPage])

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories)
  }

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.sidebarContainer}>
          <div className={styles.filterContainer}>
            <div className={styles.filterTitle}>კატეგორიები</div>
            <CategoriesList data={categories} onCategoryChange={handleCategoryChange} />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>ჩვენი კურსები</div>
            <div className={styles.searchContainer}>
              <SearchInput />
            </div>
          </div>
          <div className={styles.content}>
            {courses.map((course, index) => (
              <Card
                key={course._id || index}
                title={course.title}
                review={course.review}
                studentsQuantity={course.studentsQuantity}
                duration={course.duration}
                bordered={true}
                id={course._id}
              />
            ))}
          </div>

          <div className={styles.paginationContainer}>
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
          </div>
        </div>
      </div>
    </div>
  )
}
