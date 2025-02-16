import React from "react";
import styles from "./Syllabus.module.css";
import { Accordion } from "../../../../../../../components/UI/Accordion/Accordion";
import {
  FileIcon,
  CompleteCheckIcon,
} from "../../../../../../../components/UI/icons";

function Syllabus() {
  const syllabusData = [
    {
      id: 1,
      lectures: [
        {
          id: 1,
          lectureNumber: "1",
          lectureTime: "10:05",
          quiz: true,
        },
        {
          id: 2,
          lectureNumber: "2",
          lectureTime: "11:05",
          preview: true,
        },
      ],
    },
    {
      id: 2,
      lectures: [
        {
          id: 1,
          lectureNumber: "1",
          lectureTime: "10:05",
        },
        {
          id: 2,
          lectureNumber: "2",
          lectureTime: "11:05",
        },
      ],
    },
    {
      id: 3,
      lectures: [
        {
          id: 1,
          lectureNumber: "1",
          lectureTime: "10:05",
        },
        {
          id: 2,
          lectureNumber: "2",
          lectureTime: "11:05",
        },
      ],
    },
  ];

  return (
    <>
      {syllabusData.map((syllabus) => (
        <Accordion title="Lessons with video content" key={syllabus.id}>
          <div className={styles.syllabusContainer}>
            {syllabus.lectures.map((lecture) => (
              <div className={styles.syllabusItem}>
                <div className={styles.syllabusItemInnerContainer}>
                  <div>
                    <FileIcon />
                  </div>
                  <div>ლექცია {lecture.lectureNumber}</div>
                </div>

                <div className={styles.syllabusInfoContainer}>
                  {lecture.quiz && (
                    <div className={styles.quizz}>
                      <button className={styles.quizzBtn}>ქვიზი</button>
                    </div>
                  )}

                  {lecture.preview && (
                    <div className={styles.quizz}>
                      <button className={styles.quizzBtn}>Preview</button>
                    </div>
                  )}
                  <div className={styles.duration}>{lecture.lectureTime}</div>
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
  );
}

export default Syllabus;
