import { Card } from '../../components/UI/Card/Card'
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import styles from './Courses.module.css'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useEffect, useState } from 'react'
import { getCourses } from '../../services/courses.service'

export function Courses() {
  const [courses, setCourses] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const loadData = async (page = 1) => {
    try {
      const res = await getCourses({ page, pageSize, staticFilter: { isPublished: true } })
      // Assuming your API returns { data: [...], total: number }
      setCourses(res.data.items)

      setTotalItems(res.data.total)
    } catch (err) {
      console.log(err, 'error while load courses')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.sidebarContainer}></div>
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
                key={course.id || index}
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
