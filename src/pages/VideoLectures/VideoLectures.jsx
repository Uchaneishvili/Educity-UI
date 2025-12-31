import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './VideoLectures.module.css';
import {
  ArrowBackIcon,
  CloseIcon,
  SubmitBtnArrow,
  CompleteCheckIcon,
  FileIcon,
} from '../../components/UI/icons';
import { ProgressBar } from '../../components/UI/ProgressBar/ProgressBar';
import Modal from '../../components/UI/Modal/Modal';
import { Button } from '../../components/UI/Button/Button';
import { Video } from '../../components/VideoPlayer/Video';
import { getCourseDetailsWithSyllabus } from '../../services/courses.service';
import {
  getUserProgressByCourseId,
  completeSyllabusLevel,
} from '../../services/progress.service';
import { submitQuizAnswers } from '../../services/quizzes.service';
import { getCertificateById } from '../../services/certificate.service';
import { Loader } from '../../components/UI/Loader/Loader';
import { Accordion } from '../../components/UI/Accordion/Accordion';

function VideoLectures() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizContext, setQuizContext] = useState(null);
  const [isQuizzOpen, setIsQuizzOpen] = useState(false);
  const videoCompletedRef = useRef(false);

  const QUIZ_PASS_THRESHOLD = 0.8; // 80% required to pass

  const loadData = useCallback(async () => {
    try {
      const response = await getCourseDetailsWithSyllabus(id);
      setData(response.data);
      setVideo(response.data.intro || null);
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
        const totalLevels =
          data?.syllabus?.reduce(
            (acc, s) => acc + (s.levels?.length || 0),
            0,
          ) || 0;
        setProgress({
          completedCount: `0/${totalLevels}`,
          progressPercentage: 0,
          syllabusProgress: [],
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
    // Prevent multiple calls for the same video during current watch
    if (videoCompletedRef.current) return;

    if (!selectedLevelId || !syllabus) return;

    const alreadyCompleted = isLevelVideoCompleted(syllabus, selectedLevelId);
    if (alreadyCompleted) {
      videoCompletedRef.current = true;
      return;
    }

    videoCompletedRef.current = true;

    const syllabusIdStr = String(syllabus);
    const levelIdStr = String(selectedLevelId);

    setProgress(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        syllabusProgress: [...(prev.syllabusProgress || [])],
      };

      let sp = updated.syllabusProgress.find(
        sp => String(sp.syllabusId) === syllabusIdStr,
      );
      if (!sp) {
        sp = { syllabusId: syllabusIdStr, levels: [] };
        updated.syllabusProgress.push(sp);
      } else {
        sp = { ...sp, levels: [...sp.levels] };
        const index = updated.syllabusProgress.findIndex(
          s => String(s.syllabusId) === syllabusIdStr,
        );
        updated.syllabusProgress[index] = sp;
      }

      let lp = sp.levels.find(lp => String(lp.levelId) === levelIdStr);

      const currentLevel = data?.syllabus
        ?.find(s => String(s._id) === syllabusIdStr)
        ?.levels?.find(l => String(l._id) === levelIdStr);
      const hasQuiz = currentLevel?.quiz && currentLevel.quiz.length > 0;

      if (!lp) {
        lp = {
          levelId: levelIdStr,
          videoCompleted: true,
          quizPassed: false,
          completed: !hasQuiz,
        };
        sp.levels.push(lp);
      } else {
        const lpIndex = sp.levels.findIndex(
          l => String(l.levelId) === levelIdStr,
        );
        sp.levels[lpIndex] = {
          ...lp,
          videoCompleted: true,
          completed: !hasQuiz || (hasQuiz && lp.quizPassed === true),
        };
      }

      const totalLevels =
        data?.syllabus?.reduce((acc, s) => acc + (s.levels?.length || 0), 0) ||
        0;
      const completedLevels = updated.syllabusProgress.reduce((acc, sp) => {
        return (
          acc + (sp.levels?.filter(lp => lp.completed === true).length || 0)
        );
      }, 0);
      updated.completedCount = `${completedLevels}/${totalLevels}`;
      updated.progressPercentage =
        totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

      return updated;
    });

    try {
      await completeSyllabusLevel({
        syllabusId: syllabus,
        levelId: selectedLevelId,
        courseId: id,
        completionType: 'video',
        isPassed: true,
      });
    } catch (error) {
      console.error('Error completing video:', error);
      videoCompletedRef.current = false; // Reset on error so user can try again
      try {
        const backendProgress = await getUserProgressByCourseId(id);
        if (backendProgress?.data) {
          setProgress({ ...backendProgress.data });
        }
      } catch (reloadError) {
        console.error('Error reloading progress:', reloadError);
      }
    }
  };

  const handleGoBack = () => navigate(-1);

  const handleAnswerSelect = (questionIndex, answerId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerId }));
  };

  const onSubmitQuizAnswers = async () => {
    if (!quizContext) return;

    const answers = Object.values(selectedAnswers);

    try {
      const response = await submitQuizAnswers({ answers });

      if (response.status === 201) {
        const result = response.data;
        setQuizResult(result);

        const score = result.correctAnswers / result.totalAnswers;
        const isPassed = score >= QUIZ_PASS_THRESHOLD;

        // Send to backend
        await completeSyllabusLevel({
          syllabusId: quizContext.syllabusId,
          levelId: quizContext.levelId,
          courseId: id,
          completionType: 'quiz',
          isPassed,
        });

        // Fetch updated progress from backend
        const backendProgress = await getUserProgressByCourseId(id);
        setProgress({ ...backendProgress.data });

        if (isPassed) {
          setTimeout(() => {
            handleCancelQuiz();
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleCancelQuiz = () => {
    setIsQuizzOpen(false);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  const handleRetryQuiz = () => {
    setQuizResult(null);
    setSelectedAnswers({});
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
    return (
      progress?.syllabusProgress?.some(
        sp =>
          String(sp.syllabusId) === String(syllabusId) &&
          sp.levels?.some(
            lp => String(lp.levelId) === String(levelId) && lp.completed,
          ),
      ) || false
    );
  };

  const isLevelVideoCompleted = (syllabusId, levelId) => {
    return (
      progress?.syllabusProgress?.some(
        sp =>
          String(sp.syllabusId) === String(syllabusId) &&
          sp.levels?.some(
            lp => String(lp.levelId) === String(levelId) && lp.videoCompleted,
          ),
      ) || false
    );
  };

  const isLevelQuizCompleted = (syllabusId, levelId) => {
    return (
      progress?.syllabusProgress?.some(
        sp =>
          String(sp.syllabusId) === String(syllabusId) &&
          sp.levels?.some(
            lp => String(lp.levelId) === String(levelId) && lp.quizPassed,
          ),
      ) || false
    );
  };

  const totalLevelsFromProgress =
    progress?.completedCount?.split('/')[1] || '0';

  return (
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
              thumbnail={data?.thumbnail || ''}
              size="80%"
              onEnded={onCompleteVideo}
              key={`${selectedLevelId}-${syllabus}`}
            />
          </div>

          <div className={styles.videoLessonsContainer}>
            <div className={styles.videoLessonsInnerContainer}>
              <div className={styles.videoLessonsCompletionContainer}>
                <div className={styles.videoLessonsCompletionInnerContainer}>
                  <div className={styles.videoLessonsCompletionTitle}>
                    {progress?.completedCount || `0/${totalLevelsFromProgress}`}{' '}
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

            <div
              className={styles.videoLessonsAccordionContainer}
              key={progress?.progressPercentage ?? 'loading'} // Force re-render when progress changes
            >
              {(data?.syllabus || []).map((syllabusData, index) => (
                <Accordion
                  title={syllabusData.title}
                  key={syllabusData._id || index}
                >
                  <div className={styles.syllabusContainer}>
                    {(syllabusData.levels || []).map((level, levelIndex) => {
                      const videoCompleted = isLevelVideoCompleted(
                        syllabusData._id,
                        level._id,
                      );
                      const quizCompleted = isLevelQuizCompleted(
                        syllabusData._id,
                        level._id,
                      );
                      const levelCompleted = isLevelCompleted(
                        syllabusData._id,
                        level._id,
                      );

                      return (
                        <div
                          className={styles.syllabusItem}
                          key={`${level._id}-${videoCompleted}-${quizCompleted}`}
                        >
                          <div className={styles.syllabusItemInnerContainer}>
                            <FileIcon />
                            <div>{level.title}</div>
                          </div>

                          <div className={styles.syllabusInfoContainer}>
                            {(level.quiz || []).length > 0 && (
                              <div className={styles.quizz}>
                                <button
                                  className={styles.quizzBtn}
                                  disabled={quizCompleted || !videoCompleted}
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
                                    quizCompleted || !videoCompleted
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
                                    if (selectedLevelId !== level._id) {
                                      videoCompletedRef.current = false;
                                    }
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
                                  onClick={() =>
                                    window.open(level.contentUrl, '_blank')
                                  }
                                >
                                  მასალები
                                </button>
                              </div>
                            )}

                            {levelCompleted && (
                              <div className={styles.isCompleted}>
                                <CompleteCheckIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      )}

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
            <div className={styles.quizResultMessage}>
              {quizResult.correctAnswers / quizResult.totalAnswers >=
              QUIZ_PASS_THRESHOLD
                ? 'გილოცავთ! თქვენ წარმატებით გაიარეთ ქვიზი.'
                : 'არასაკმარისი ქულა. გთხოვთ, თავიდან სცადოთ! (მინიმუმ 80% საჭიროა)'}
            </div>
            <Button
              type="primary"
              onClick={
                quizResult.correctAnswers / quizResult.totalAnswers >=
                QUIZ_PASS_THRESHOLD
                  ? handleCancelQuiz
                  : handleRetryQuiz
              }
              style={{ marginTop: '20px' }}
            >
              {quizResult.correctAnswers / quizResult.totalAnswers >=
              QUIZ_PASS_THRESHOLD
                ? 'დახურვა'
                : 'თავიდან ცდა'}
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.quizzModalQuestionsContainer}>
              {(quiz || []).map((quizz, index) => (
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
                    {(quizz.answers || []).map((answer, answerIndex) => (
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
                disabled={
                  Object.keys(selectedAnswers).length !== (quiz?.length || 0) ||
                  (quizContext &&
                    isLevelQuizCompleted(
                      quizContext.syllabusId,
                      quizContext.levelId,
                    ))
                }
              >
                Submit <SubmitBtnArrow />
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default VideoLectures;
