import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoLectures.module.css';
import {
  ArrowBackIcon,
  FileIcon,
  CompleteCheckIcon,
} from '../../components/UI/icons';
import { Accordion } from '../../components/UI/Accordion/Accordion';
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar';
import Modal from '../../components/UI/Modal/Modal';
import {
  CloseIcon,
  ReviewModalColoredStar,
  ReviewModalUncoloredStar,
  SubmitBtnArrow,
} from '../../components/UI/icons';
import TextArea from '../../components/UI/Textarea/Textarea';
import { Button } from '../../components/UI/Button/Button';
import { Video } from '../../components/VideoPlayer/Video';
import { addReviewToCourse } from '../../services/review.service';
import { getCourseDetails } from '../../services/courses.service';
import { Loader } from '../../components/UI/Loader/Loader';

function VideoLectures() {
  const { id } = useParams();

  const quizzQuestions = [
    {
      id: 1,
      question: 'Lorem ipsum dolor sit amet consectetur?',
      answers: ['Lorem ipsum dolor', 'Lorem ipsum dolor', 'Lorem ipsum dolor'],
    },
    {
      id: 2,
      question: 'Lorem ipsum dolor sit amet consectetur?',
      answers: ['Lorem ipsum dolor', 'Lorem ipsum dolor', 'Lorem ipsum dolor'],
    },
  ];

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isQuizzOpen, setIsQuizzOpen] = useState(false);
  const [starsAmount, setStarsAmount] = useState(0);
  const [comment, setComment] = useState('');
  const [data, setData] = useState();
  const [playBackId, setPlayBackId] = useState();
  const [loading, setLoading] = useState(true);

  const addReview = async () => {
    try {
      await addReviewToCourse(id, {
        rating: starsAmount,
        comment: comment,
      });

      setIsReviewOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const loadData = useCallback(async () => {
    try {
      const response = await getCourseDetails(id);

      setData(response.data);
      setPlayBackId(response.data.intro);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <div className="mainContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <div className={styles.videoLecturesTitleContainer}>
              <div className={styles.videoLecturesTitleButton}>
                <ArrowBackIcon />
              </div>
              <div className={styles.videoLecturesTitle}>{data?.title}</div>
            </div>

            <div className={styles.videoContainer}>
              <Video
                playbackId={playBackId}
                thumbnail={data.thumbnail}
                size={'80%'}
              />
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
                {/* {data.map(data => (
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
              ))} */}
              </div>
            </div>
            {/* <div className={styles.tabSelectorContainer}>
            <TabSections
              tabs={[
                { id: 0, label: 'კურსის შესახებ' },
                { id: 1, label: 'სილაბუსი' },
                { id: 2, label: 'შეფასება' },
                { id: 3, label: 'დაგვიკავშირდით' }
              ]}
              description={data.description}
            />
          </div> */}
          </div>
        )}
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
            <div className={styles.reviewModalAmount}>{starsAmount}</div>
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
              onChange={e => setComment(e.target.value)}
            />

            <div className={styles.reviewModalFeedbackButtons}>
              <button className={styles.cancelButton}>Cancel</button>

              <Button type="primary" shadow={false} onClick={addReview}>
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
          {quizzQuestions.map(quizz => (
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
          <button className={styles.cancelButton}>Cancel</button>

          <Button type="primary">
            Submit <SubmitBtnArrow />
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default VideoLectures;
