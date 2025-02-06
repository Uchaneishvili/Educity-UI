import styles from './CourseDetails.module.css'
import { ClockIcon, StudentIcon, LectureIcon, LevelIcon } from '../../../components/UI/icons'
import { Card } from '../../../components/UI/Card/Card'
import TabSections from './components/TabSections/TabSections'
import { getCourseDetails } from '../../../services/courses.service'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Loader } from '../../../components/UI/Loader/Loader'
import { Error } from '../../../components/Error/Error'
export function CourseDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getCourseDetails(id)
      setData(res.data)
    } catch (error) {
      console.error('Error loading course details:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    )
  }

  if (!data) {
    return <Error />
  }

  return (
    <>
      <div className={`${styles.container} mainContainer`}>
        <div className={styles.innerContainer}>
          <div className={styles.lecturerContainer}>
            <div className={styles.categoryButton}>{data.category?.name || 'დიზაინი'}</div>
            ლექტორი: {data.lecturer?.fullName || 'მარიამ რთველაძე'}
          </div>

          <div className={styles.titleContainer}>{data.title}</div>

          <div className={styles.shortInfoContainer}>
            <div className={styles.duration}>
              <ClockIcon /> {data.totalDuration || 0} თვე
            </div>
            <div className={styles.studentsQuantity}>
              <StudentIcon /> {data.enrolledStudentsCount || 0} სტუდენტი
            </div>
            <div className={styles.level}>
              <LevelIcon /> {data.level || 'საბაზისო'}
            </div>
            <div className={styles.lecturesQuantity}>
              <LectureIcon /> {data.lecturesCount || 0} ლექცია
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.descriptionContainer} mainContainer`}>
        <div className={styles.cardContainer}>
          <Card
            showBuy={true}
            buttonName={'კურსზე რეგისტრაცია'}
            title={data.title}
            discountedPrice={data.discountedPrice}
            price={data.price}
          />
        </div>
        <div className={styles.description}>
          <TabSections
            tabs={[
              { id: 0, label: 'კურსის შესახებ' },
              { id: 1, label: 'სილაბუსი' },
              { id: 2, label: 'შეფასება' },
              { id: 3, label: 'დაგვიკავშირდით' }
            ]}
          />
        </div>
      </div>
    </>
  )
}
