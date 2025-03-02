import React, { useCallback, useEffect, useState } from 'react'
import styles from './Syllabus.module.css'
import { Accordion } from '../../../../../../../components/UI/Accordion/Accordion'
import { FileIcon, CompleteCheckIcon } from '../../../../../../../components/UI/icons'
import { getSyllabusByCourseId } from '../../../../../../../services/syllabus.service'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../../../../../components/UI/Loader/Loader'
function Syllabus() {
  const [syllabusData, setSyllabusData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const loadSyllabusData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await getSyllabusByCourseId(id)
      setSyllabusData(data.data.syllabus)
    } catch {
      console.log('error while loading syllabus data')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadSyllabusData()
  }, [loadSyllabusData])

  if (isLoading) {
    return <Loader />
  }

  console.log('FFS', syllabusData)
  return (
    <>
      {syllabusData.map((syllabus) => (
        <Accordion title={syllabus.title} key={syllabus._id}>
          <div className={styles.syllabusContainer}>
            {syllabus.levels.map((level) => (
              <div className={styles.syllabusItem}>
                <div className={styles.syllabusItemInnerContainer}>
                  <div>
                    <FileIcon />
                  </div>
                  <div>{level.title}</div>
                </div>

                <div className={styles.syllabusInfoContainer}>
                  {level.quiz && (
                    <div className={styles.quizz}>
                      <button className={styles.quizzBtn}>ქვიზი</button>
                    </div>
                  )}

                  {level.preview && (
                    <div className={styles.quizz}>
                      <button className={styles.quizzBtn}>Preview</button>
                    </div>
                  )}
                  <div className={styles.duration}>{level.lectureTime}</div>
                  <div className={styles.isCompleted}>
                    <CompleteCheckIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      ))}
    </>
  )
}

export default Syllabus
