import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './VideoLectures.module.css';
import { ArrowBackIcon } from '../../components/UI/icons';
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar';
import Modal from '../../components/UI/Modal/Modal';
import {
  CloseIcon,
  SubmitBtnArrow,
  CompleteCheckIcon,
  FileIcon,
} from '../../components/UI/icons';
import { Button } from '../../components/UI/Button/Button';
import { Video } from '../../components/VideoPlayer/Video';
import { getCourseDetailsWithSyllabus } from '../../services/courses.service';
import { Loader } from '../../components/UI/Loader/Loader';
import { Accordion } from '../../components/UI/Accordion/Accordion';
import { completeSyllabusLevel } from '../../services/progress.service';
import { getUserProgressByCourseId } from '../../services/progress.service';
import { submitQuizAnswers } from '../../services/quizzes.service';
import { getCertificateById } from '../../services/certificate.service';
import { trackEvent } from '../../utils/ClarityTracking';

function VideoLectures() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState();
  const [progress, setProgress] = useState();
  const [quiz, setQuiz] = useState([]);

  const [isQuizzOpen, setIsQuizzOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedLevelId, setSelectedLevelId] = useState();
  const [syllabus, setSyllabus] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizContext, setQuizContext] = useState(null);

  const QUIZ_PASS_THRESHOLD = 0.7; // 70% minimum score

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
    } catch (error) {
      if (error.response?.status === 404) {
        // If 404, estimate total levels from loaded course data for initial progress display
        const totalLevels =
          data?.syllabus.reduce(
            (acc, current) => acc + current.levels.length,
            0,
          ) || 0;
        setProgress({
          completedCount: `0/${totalLevels}`,
          progressPercentage: 0,
        });
      } else {
        console.error(error);
      }
    }
  }, [id, data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (data) {
      loadProgress();
    }
  }, [data, loadProgress]);

  const onCompleteVideo = async () => {
    if (!selectedLevelId || !syllabus) return;

    try {
      trackEvent(
        'video_completed',
        `${data?.title || ''}_${selectedLevelId || ''}`,
      );

      await completeSyllabusLevel({
        syllabusId: syllabus,
        levelId: selectedLevelId,
        courseId: id,
        completionType: 'video',
      });
      loadProgress();
    } catch (error) {
      console.error('Error completing syllabus level:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerSelect = (questionIndex, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerId,
    }));
  };

  const onSubmitQuizAnswers = async () => {
    try {
      const answers = Object.values(selectedAnswers);
      const payload = { answers: answers };

      const response = await submitQuizAnswers(payload);

      if (response.status === 201) {
        const result = response.data;
        setQuizResult(result);

        const score = result.correctAnswers / result.totalAnswers;
        const isPassed = score >= QUIZ_PASS_THRESHOLD;

        if (quizContext) {
          await completeSyllabusLevel({
            syllabusId: quizContext.syllabusId,
            levelId: quizContext.levelId,
            courseId: id,
            completionType: 'quiz',
            isPassed: isPassed,
          });
        }

        loadProgress();
      }
    } catch (error) {
      console.error('Error submitting quiz answers:', error);
    }
  };

  const handleCancelQuiz = () => {
    setIsQuizzOpen(false);
    setSelectedAnswers({});
    setQuizResult(null);
    setQuizContext(null);
  };

  const getCertificate = async () => {
    if (progress?.progressPercentage !== 100) return;
    try {
      const response = await getCertificateById(id);
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      console.error('Error getting certificate:', error);
    }
  };

  const isLevelCompleted = (syllabusId, levelId) => {
    if (
      !progress ||
      !progress.syllabusProgress ||
      progress.syllabusProgress.length === 0
    ) {
      return false;
    }

    const targetSyllabusId = String(syllabusId);
    const targetLevelId = String(levelId);

    const syllabusProgress = progress.syllabusProgress.find(
      sp => String(sp.syllabusId) === targetSyllabusId,
    );

    if (
      !syllabusProgress ||
      !syllabusProgress.levels ||
      syllabusProgress.levels.length === 0
    ) {
      return false;
    }

    const levelProgress = syllabusProgress.levels.find(
      lp => String(lp.levelId) === targetLevelId,
    );

    return levelProgress?.completed === true;
  };

  const isLevelVideoCompleted = (syllabusId, levelId) => {
    if (
      !progress ||
      !progress.syllabusProgress ||
      progress.syllabusProgress.length === 0
    ) {
      return false;
    }

    const targetSyllabusId = String(syllabusId);
    const targetLevelId = String(levelId);

    const syllabusProgress = progress.syllabusProgress.find(
      sp => String(sp.syllabusId) === targetSyllabusId,
    );

    if (
      !syllabusProgress ||
      !syllabusProgress.levels ||
      syllabusProgress.levels.length === 0
    ) {
      return false;
    }

    const levelProgress = syllabusProgress.levels.find(
      lp => String(lp.levelId) === targetLevelId,
    );

    return levelProgress?.videoCompleted === true;
  };

  const totalLevelsFromProgress =
    progress?.completedCount?.split('/')[1] || '0';

  return (
    <>
      <div className="mainContainer">
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            <div className={styles.videoLecturesTitleContainer}>
              <div
                className={styles.videoLecturesTitleButton}
                onClick={handleGoBack}
                style={{ cursor: 'pointer' }}
              >
                <ArrowBackIcon />
              </div>
              <div className={styles.videoLecturesTitle}>{data?.title}</div>
            </div>

            <hr />

            <div className={styles.videoContainer}>
              <Video
                playbackId={video}
                thumbnail={data.thumbnail}
                size={'80%'}
                onEnded={onCompleteVideo}
              />
            </div>
            <div className={styles.videoLessonsContainer}>
              <div className={styles.videoLessonsInnerContainer}>
                <div className={styles.videoLessonsCompletionContainer}>
                  <div className={styles.videoLessonsCompletionInnerContainer}>
                    <div className={styles.videoLessonsCompletionTitle}>
                      {progress?.completedCount ||
                        `0/${totalLevelsFromProgress}`}{' '}
                      COMPLETED
                    </div>
                  </div>
                  <ProgressBar
                    percentage={progress?.progressPercentage || 0}
                    totalBars={100}
                  />
                </div>

                {progress?.progressPercentage === 100 && (
                  <div className={styles.certificateButtonContainer}>
                    <button
                      className={styles.certificateButton}
                      onClick={getCertificate}
                    >
                      სერთიფიკატის მიღება
                    </button>
                  </div>
                )}
              </div>

              <hr />

              <div className={styles.videoLessonsAccordionContainer}>
                {data.syllabus.map((syllabusData, index) => (
                  <Accordion
                    title={syllabusData.title}
                    key={syllabusData._id || index}
                  >
                    <div className={styles.syllabusContainer}>
                      {syllabusData.levels.map((level, levelIndex) => (
                        <div className={styles.syllabusItem} key={levelIndex}>
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
                                  disabled={
                                    !isLevelVideoCompleted(
                                      syllabusData._id,
                                      level._id,
                                    )
                                  }
                                  onClick={() => {
                                    setIsQuizzOpen(true);
                                    setQuiz(level.quiz);
                                    setQuizContext({
                                      syllabusId: syllabusData._id,
                                      levelId: level._id,
                                    });
                                    setQuizResult(null);
                                    setSelectedAnswers({});
                                  }}
                                  style={
                                    !isLevelVideoCompleted(
                                      syllabusData._id,
                                      level._id,
                                    )
                                      ? {
                                          opacity: 0.7,
                                          cursor: 'not-allowed',
                                          pointerEvents: 'none',
                                        }
                                      : {}
                                  }
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
                                    setSyllabus(syllabusData._id);
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

                            {/* Show completion icon only if both video and quiz are done/passed */}
                            {isLevelCompleted(syllabusData._id, level._id) && (
                              <div className={styles.isCompleted}>
                                <CompleteCheckIcon />
                              </div>
                            )}
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
          <div className={styles.quizzModalHeaderTitle}>
            {quizResult ? 'Quiz Results' : 'ქვიზი'}
          </div>
          <div
            className={styles.quizzModalCloseIcon}
            onClick={handleCancelQuiz}
          >
            <CloseIcon />
          </div>
        </div>

        {quizResult ? (
          <div className={styles.quizResultContainer}>
            <div className={styles.quizResultPercentage}>
              {Math.round(
                (quizResult.correctAnswers / quizResult.totalAnswers) * 100,
              )}
              %
            </div>
            <div className={styles.quizResultScore}>
              Score: {quizResult.correctAnswers} / {quizResult.totalAnswers}
            </div>
            {/* Display message based on pass threshold */}
            <div className={styles.quizResultMessage}>
              {quizResult.correctAnswers / quizResult.totalAnswers >=
              QUIZ_PASS_THRESHOLD
                ? 'გილოცავთ! თქვენ წარმატებით გაიარეთ ქვიზი.'
                : 'არასაკმარისი ქულა. გთხოვთ, გაიმეოროთ მცდელობა.'}
            </div>

            {quizResult.correctAnswers / quizResult.totalAnswers >=
            QUIZ_PASS_THRESHOLD ? (
              <Button
                type="primary"
                onClick={handleCancelQuiz}
                style={{ marginTop: '20px' }}
              >
                დახურვა
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => setQuizResult(null)}
                style={{ marginTop: '20px' }}
              >
                ახალი მცდელობა
              </Button>
            )}
          </div>
        ) : (
          <>
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
                    {quizz.answers.map((answer, answerIndex) => (
                      <div
                        key={answerIndex}
                        className={styles.quizzModalQuestionAnswer}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={selectedAnswers[index] === answer._id}
                          onChange={() => handleAnswerSelect(index, answer._id)}
                        />
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
              <button
                className={styles.cancelButton}
                onClick={handleCancelQuiz}
              >
                Cancel
              </button>

              <Button
                type="primary"
                onClick={onSubmitQuizAnswers}
                disabled={Object.keys(selectedAnswers).length !== quiz.length}
              >
                Submit <SubmitBtnArrow />
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default VideoLectures;
