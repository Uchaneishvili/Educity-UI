import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoLectures.module.css';
import { ArrowBackIcon } from '../../components/UI/icons';
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar';
import Modal from '../../components/UI/Modal/Modal';
import { CloseIcon, SubmitBtnArrow } from '../../components/UI/icons';
import { Button } from '../../components/UI/Button/Button';
import { Video } from '../../components/VideoPlayer/Video';
import { getCourseDetailsWithSyllabus } from '../../services/courses.service';
import { Loader } from '../../components/UI/Loader/Loader';
import { FileIcon, CompleteCheckIcon } from '../../components/UI/icons';
import { Accordion } from '../../components/UI/Accordion/Accordion';
import { completeSyllabusLevel } from '../../services/progress.service';
import { getUserProgressByCourseId } from '../../services/progress.service';

function VideoLectures() {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [progress, setProgress] = useState();
  const [quiz, setQuiz] = useState([]);

  const [isQuizzOpen, setIsQuizzOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedLevelId, setSelectedLevelId] = useState();
  const [syllabus, setSyllabus] = useState();
  const loadData = useCallback(async () => {
    try {
      const response = await getCourseDetailsWithSyllabus(id);

      setData(response.data);

      setVideo(response.data.intro);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }, [id]);

  const loadProgress = useCallback(async () => {
    try {
      const response = await getUserProgressByCourseId(id);
      setProgress(response.data);

      console.log(response.data);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, [id]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onCompleteVideo = async () => {
    try {
      await completeSyllabusLevel({
        syllabusId: syllabus,
        levelId: selectedLevelId,
        courseId: id,
      });
    } catch (error) {
      console.error('Error completing syllabus level:', error);
    }
  };

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
                playbackId={video}
                thumbnail={data.thumbnail}
                size={'80%'}
                onEnded={onCompleteVideo}
              />
            </div>
            <div className={styles.videoLessonsContainer}>
              <div className={styles.videoLessonsCompletionContainer}>
                <div className={styles.videoLessonsCompletionInnerContainer}>
                  <div className={styles.videoLessonsCompletionTitle}>
                    {progress?.completedCount || '0/5'} COMPLETED
                  </div>
                </div>
                <ProgressBar
                  percentage={progress?.progressPercentage || 0}
                  totalBars={5}
                />
              </div>

              <div className={styles.videoLessonsAccordionContainer}>
                {data.syllabus.map(data => (
                  <Accordion title={data.title} key={data.id}>
                    <div className={styles.syllabusContainer}>
                      {data.levels.map((level, index) => (
                        <div className={styles.syllabusItem}>
                          <div className={styles.syllabusItemInnerContainer}>
                            <div>
                              <FileIcon />
                            </div>
                            <div>{level.title}</div>
                          </div>

                          <div className={styles.syllabusInfoContainer}>
                            {level.quiz.length > 0 && (
                              <div className={styles.quizz}>
                                <button
                                  className={styles.quizzBtn}
                                  onClick={() => {
                                    console.log('level.quiz', level.quiz);

                                    setIsQuizzOpen(true);

                                    setQuiz(level.quiz);
                                  }}
                                >
                                  ქვიზი
                                </button>
                              </div>
                            )}

                            {level.videoUrl && (
                              <div className={styles.videoButton}>
                                <button
                                  className={styles.quizzBtn}
                                  onClick={() => {
                                    setVideo(level.videoUrl);
                                    setSelectedLevelId(level._id);
                                    setSyllabus(data._id);
                                  }}
                                >
                                  ვიდეო
                                </button>
                              </div>
                            )}

                            {level.contentUrl && (
                              <div className={styles.videoButton}>
                                <button
                                  className={styles.quizzBtn}
                                  onClick={() => {
                                    window.open(level.contentUrl, '_blank');
                                  }}
                                >
                                  მასალები
                                </button>
                              </div>
                            )}

                            <div className={styles.isCompleted}>
                              <CompleteCheckIcon />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isQuizzOpen} width="650px">
        <div className={styles.quizzModalHeaderContainer}>
          <div className={styles.quizzModalHeaderTitle}>ქვიზი</div>
          <div
            className={styles.quizzModalCloseIcon}
            onClick={() => {
              setIsQuizzOpen(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>

        <div className={styles.quizzModalQuestionsContainer}>
          {quiz?.map((quizz, index) => (
            <div key={index} className={styles.quizzModalQuestionContainer}>
              <div className={styles.quizzModalQuestionHeader}>
                <div className={styles.quizzModalQuestionNumber}>
                  {index + 1}
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
                      {answer.text}
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
