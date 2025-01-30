import styles from './CourseDetails.module.css'
import { ClockIcon, StudentIcon, LectureIcon, LevelIcon } from '../../../components/UI/icons'
import { Card } from '../../../components/UI/Card/Card'
import TabSections from './components/TabSections/TabSections'
import { getCourseDetails } from '../../../services/courses.service'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function CourseDetails() {
  const { id } = useParams()

  const [data, setData] = useState(null)

  const loadData = async () => {
    try {
      const res = await getCourseDetails(id)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadData()
  }, [id])
  return (
    <>
      <div className={`${styles.container} mainContainer`}>
        <div className={styles.innerContainer}>
          <div className={styles.lecturerContainer}>
            <div className={styles.categoryButton}>დიზაინი</div>
            ლექტორი: მარიამ რთველაძე
          </div>

          <div className={styles.titleContainer}>
            The Ultimate Guide to the best WordPress LMS Plugin
          </div>

          <div className={styles.shortInfoContainer}>
            <div className={styles.duration}>
              <ClockIcon /> 3 თვე
            </div>
            <div className={styles.studentsQuantity}>
              <StudentIcon /> 20 სტუდენტი
            </div>
            <div className={styles.level}>
              <LevelIcon /> საბაზისო
            </div>
            <div styles={styles.lecturesQuantity}>
              <LectureIcon /> ლექცია
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.descriptionContainer} mainContainer`}>
        <div className={styles.cardContainer}>
          <Card showBuy={true} buttonName={'კურსზე რეგისტრაცია'} />
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
