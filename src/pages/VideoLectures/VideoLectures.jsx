import React, { useState } from "react";
import styles from "./VideoLectures.module.css";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FileIcon,
  CompleteCheckIcon,
  BlockIcon,
} from "../../components/UI/icons";

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
          time: "12:30",
          unlocked: true,
        },
        {
          id: 2,
          time: "1:35",
          unlocked: true,
        },
        {
          id: 3,
          time: "8:45",
          unlocked: false,
        },
      ],
    },
    {
      id: 1,
      lessonsAmount: 5,
      mins: 45,
      closedTab: true,
      lessons: [
        {
          id: 1,
          time: "12:30",
          unlocked: true,
        },
        {
          id: 2,
          time: "1:35",
          unlocked: true,
        },
        {
          id: 3,
          time: "8:45",
          unlocked: false,
        },
      ],
    },
  ];

  const [tabsState, setTabsState] = useState({});

  return (
    <div className="mainContainer">
      <div className={styles.container}>
        <div className={styles.videoLecturesTitleContainer}>
          <div className={styles.videoLecturesTitleButton}>
            <ArrowBackIcon />
          </div>
          <div className={styles.videoLecturesTitle}>
            ვიდეო ლექციები / UI/UX დიზაინი
          </div>
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
            <div className={styles.videoLessonsCompletionTitle}>
              2/5 COMPLETED
            </div>
            <div className={styles.videoLessonsCompletionProgressBar}>
              <div className={styles.videoLessonsCompletionProgressLine}></div>
              <div className={styles.videoLessonsCompletionProgressLine}></div>
              <div className={styles.videoLessonsCompletionProgressLine}></div>
              <div className={styles.videoLessonsCompletionProgressLine}></div>
              <div className={styles.videoLessonsCompletionProgressLine}></div>
            </div>
          </div>

          <div className={styles.videoLessonsAccordionContainer}>
            {data.map((data) => (
              <div key={data.id}>
                <div className={styles.videoLessonsAccordionTab}>
                  <div
                    className={styles.videoLessonsAccordionTabInnerContainer}
                  >
                    <div
                      onClick={(data) => {
                        setTabsState((prevState) => ({
                          ...prevState,
                          [data.id]: !prevState[data.id],
                        }));
                      }}
                    >
                      {tabsState[data.id] ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    </div>

                    <div className={styles.videoLessonsAccordionTabTitle}>
                      Lessons With Video Content
                    </div>
                  </div>
                  <div
                    className={styles.videoLessonsAccordionTabInnerContainer}
                  >
                    <div className={styles.videoLessonsAmount}>
                      {data.lessonsAmount} Lessons
                    </div>
                    <div className={styles.videoLessonsDuration}>
                      {data.mins} Mins
                    </div>
                  </div>
                </div>

                {data.lessons.map((lesson) => (
                  <div
                    className={styles.videoLessonsAccordionToggle}
                    key={lesson.id}
                  >
                    <div className={styles.videoLessonsAccordionToggleTab}>
                      <div
                        className={
                          styles.videoLessonsAccordionTabInnerContainer
                        }
                      >
                        <FileIcon />
                        <div
                          className={styles.videoLessonsAccordionToggleTabTitle}
                        >
                          Lessons With Video Content
                        </div>
                      </div>
                      <div
                        className={
                          styles.videoLessonsAccordionTabInnerContainer
                        }
                      >
                        <button className={styles.videoLessonsAccordionQuizBtn}>
                          ქვიზის დაწყება
                        </button>

                        <div className={styles.videoLessonsAccordionQuizTime}>
                          {lesson.time}
                        </div>
                        <div
                          className={styles.videoLessonsAccordionIconContainer}
                        >
                          {lesson.unlocked ? (
                            <CompleteCheckIcon />
                          ) : (
                            <BlockIcon />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoLectures;
