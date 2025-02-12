import React, { useState } from 'react'
import styles from './VideoLectures.module.css'
import { ArrowBackIcon, FileIcon, CompleteCheckIcon } from '../../components/UI/icons'
import { Accordion } from '../../components/UI/Accordion/Accordion'
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar'

function VideoLectures() {
  const data = [
    {
      id: 1,
      lessonsAmount: 5,
      mins: 45,
      closedTab: true,
      lessons: [
        {
          id: 1,
          time: '12:30',
          unlocked: true
        },
        {
          id: 2,
          time: '1:35',
          unlocked: true
        },
        {
          id: 3,
          time: '8:45',
          unlocked: false
        }
      ]
    },
    {
      id: 1,
      lessonsAmount: 5,
      mins: 45,
      closedTab: true,
      lessons: [
        {
          id: 1,
          time: '12:30',
          unlocked: true
        },
        {
          id: 2,
          time: '1:35',
          unlocked: true
        },
        {
          id: 3,
          time: '8:45',
          unlocked: false
        }
      ]
    }
  ]

  const [tabsState, setTabsState] = useState({})

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.videoLecturesTitleContainer}>
          <div className={styles.videoLecturesTitleButton}>
            <ArrowBackIcon />
          </div>
          <div className={styles.videoLecturesTitle}>ვიდეო ლექციები / UI/UX დიზაინი</div>
        </div>

        <div className={styles.videoContainer}>
          <video controls>
            <source
              src="https://videocdn.cdnpk.net/videos/838129da-4f19-4fee-be20-62fb61cee154/horizontal/previews/videvo_watermarked/large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className={styles.videoLessonsContainer}>
          <div className={styles.videoLessonsCompletionContainer}>
            <div className={styles.videoLessonsCompletionTitle}>2/5 COMPLETED</div>
            <ProgressBar percentage={40} totalBars={5} />
          </div>

          <div className={styles.videoLessonsAccordionContainer}>
            {data.map((data) => (
              <Accordion
                title="Lessons with video content
"
              >
                <div className={styles.syllabusContainer}>
                  <div className={styles.syllabusItem}>
                    <div className={styles.syllabusItemInnerContainer}>
                      <div>
                        <FileIcon />
                      </div>
                      <div>ლექცია 1</div>
                    </div>

                    <div className={styles.syllabusInfoContainer}>
                      <div className={styles.duration}>10:05</div>
                      <div className={styles.isCompleted}>
                        <CompleteCheckIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.syllabusItem}>
                    <div className={styles.syllabusItemInnerContainer}>
                      <div>
                        <FileIcon />
                      </div>
                      <div>ლექცია 1</div>
                    </div>

                    <div className={styles.syllabusInfoContainer}>
                      <div className={styles.duration}>10:05</div>
                      <div className={styles.isCompleted}>
                        <CompleteCheckIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.syllabusItem}>
                    <div className={styles.syllabusItemInnerContainer}>
                      <div>
                        <FileIcon />
                      </div>
                      <div>ლექცია 1</div>
                    </div>

                    <div className={styles.syllabusInfoContainer}>
                      <div className={styles.duration}>10:05</div>
                      <div className={styles.isCompleted}>
                        <CompleteCheckIcon />
                      </div>
                    </div>
                  </div>
                  <div className={styles.syllabusItem}>
                    <div className={styles.syllabusItemInnerContainer}>
                      <div>
                        <FileIcon />
                      </div>
                      <div>ლექცია 1</div>
                    </div>

                    <div className={styles.syllabusInfoContainer}>
                      <div className={styles.quizz}>
                        <button className={styles.quizzBtn}> ქვიზის დაწყება</button>
                      </div>
                      <div className={styles.duration}>10:05</div>
                      <div className={styles.isCompleted}>
                        <CompleteCheckIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoLectures
