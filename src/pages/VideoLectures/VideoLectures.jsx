import React, { useState } from "react";
import styles from "./VideoLectures.module.css";
import {
  ArrowBackIcon,
  FileIcon,
  CompleteCheckIcon,
} from "../../components/UI/icons";
import { Accordion } from "../../components/UI/Accordion/Accordion";
import { ProgressBar } from "../../components/UI/ProgressBar/ProgressBar";
import Modal from "../../components/UI/Modal/Modal";
import {
  CloseIcon,
  ReviewModalColoredStar,
  ReviewModalUncoloredStar,
  SubmitBtnArrow,
} from "../../components/UI/icons";
import TextArea from "../../components/UI/Textarea/Textarea";
import { Button } from "../../components/UI/Button/Button";

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
      id: 2,
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

  const quizzQuestions = [
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet consectetur?",
      answers: ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor"],
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet consectetur?",
      answers: ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor"],
    },
  ];

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isQuizzOpen, setIsQuizzOpen] = useState(false);
  const [starsAmount, setStarsAmount] = useState(0);

  return (
    <>
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
              <div className={styles.videoLessonsCompletionInnerContainer}>
                <div className={styles.videoLessonsCompletionTitle}>
                  2/5 COMPLETED
                </div>
                <button
                  className={styles.videoLessonsReviewBtn}
                  onClick={() => setIsReviewOpen(true)}
                >
                  შეფასების დაწერა
                </button>
              </div>
              <ProgressBar percentage={40} totalBars={5} />
            </div>

            <div className={styles.videoLessonsAccordionContainer}>
              {data.map((data) => (
                <Accordion
                  title="Lessons with video content
"
                  key={data.id}
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
                          <button
                            className={styles.quizzBtn}
                            onClick={() => setIsQuizzOpen(true)}
                          >
                            ქვიზი
                          </button>
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

      <Modal isOpen={isReviewOpen} width="650px">
        <div className={styles.reviewModalHeaderContainer}>
          <div className={styles.reviewModalHeaderTitle}>Write a Review</div>
          <div
            className={styles.reviewModalCloseIcon}
            onClick={() => setIsReviewOpen(false)}
          >
            <CloseIcon />
          </div>
        </div>
        <div className={styles.reviewModalMainContainer}>
          <div className={styles.reviewModalMainTitle}>
            <div className={styles.reviewModalAmount}>{starsAmount}.0</div>
            <div className={styles.reviewModalRate}>(Good/Amazing)</div>
          </div>
          <div className={styles.reviewModalStars}>
            {[...Array(5)].map((_, index) => (
              <div key={index} onClick={() => setStarsAmount(index + 1)}>
                {index < starsAmount ? (
                  <ReviewModalColoredStar />
                ) : (
                  <ReviewModalUncoloredStar />
                )}
              </div>
            ))}
          </div>

          <form className={styles.reviewModalFeedbackForm}>
            <TextArea
              id="reviewModalFeedback"
              name="Feedback"
              placeholder="Write down your feedback here..."
            />

            <div className={styles.reviewModalFeedbackButtons}>
              <button>Cancel</button>

              <Button type="primary">
                Submit Review <SubmitBtnArrow />
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isQuizzOpen} width="650px">
        <div className={styles.quizzModalHeaderContainer}>
          <div className={styles.quizzModalHeaderTitle}>ქვიზი</div>
          <div
            className={styles.quizzModalCloseIcon}
            onClick={() => setIsQuizzOpen(false)}
          >
            <CloseIcon />
          </div>
        </div>

        <div className={styles.quizzModalQuestionsContainer}>
          {quizzQuestions.map((quizz) => (
            <div key={quizz.id} className={styles.quizzModalQuestionContainer}>
              <div className={styles.quizzModalQuestionHeader}>
                <div className={styles.quizzModalQuestionNumber}>
                  {quizz.id}
                </div>
                <div className={styles.quizzModalQuestionText}>
                  {quizz.question}
                </div>
              </div>
              <div className={styles.quizzModalQuestionAnswers}>
                {quizz.answers.map((answer, index) => (
                  <div key={index} className={styles.quizzModalQuestionAnswer}>
                    <input type="radio" />
                    <div className={styles.quizzModalQuestionAnswerText}>
                      {answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.quizzModalButtons}>
          <button>Cancel</button>

          <Button type="primary">
            Submit <SubmitBtnArrow />
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default VideoLectures;
