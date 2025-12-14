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

  const QUIZ_PASS_THRESHOLD = 0.7;

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
    if (videoCompletedRef.current) return;
    videoCompletedRef.current = true;

    if (!selectedLevelId || !syllabus) return;

    // Optimistic update for video completion
    setProgress(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        syllabusProgress: [...(prev.syllabusProgress || [])],
      };
      let sp = updated.syllabusProgress.find(
        sp => String(sp.syllabusId) === String(syllabus),
      );
      if (!sp) {
        sp = { syllabusId: syllabus, levels: [] };
        updated.syllabusProgress.push(sp);
      }
      let lp = sp.levels.find(
        lp => String(lp.levelId) === String(selectedLevelId),
      );
      if (!lp) {
        lp = {
          levelId: selectedLevelId,
          videoCompleted: true,
          completed: false,
          quizPassed: false,
        };
        sp.levels.push(lp);
      } else {
        lp.videoCompleted = true;
      }
      lp.completed = lp.videoCompleted && lp.quizPassed; // mark completed if quiz was already passed
      return updated;
    });

    // Send to backend
    await completeSyllabusLevel({
      syllabusId: syllabus,
      levelId: selectedLevelId,
      courseId: id,
      completionType: 'video',
      isPassed: true,
    });

    // Fetch updated progress from backend and merge
    const backendProgress = await getUserProgressByCourseId(id);
    setProgress(prev => {
      if (!prev) return backendProgress.data;
      const merged = { ...backendProgress.data };
      merged.syllabusProgress = merged.syllabusProgress.map(sp => {
        const localSp = prev.syllabusProgress?.find(
          lsp => String(lsp.syllabusId) === String(sp.syllabusId),
        );
        if (!localSp) return sp;
        sp.levels = sp.levels.map(lp => {
          const localLp = localSp.levels?.find(
            llp => String(llp.levelId) === String(lp.levelId),
          );
          if (!localLp) return lp;
          return {
            ...lp,
            videoCompleted: lp.videoCompleted || localLp.videoCompleted,
            quizPassed: lp.quizPassed || localLp.quizPassed,
            completed:
              (lp.videoCompleted || localLp.videoCompleted) &&
              (lp.quizPassed || localLp.quizPassed),
          };
        });
        return sp;
      });
      return merged;
    });
  };

  const handleGoBack = () => navigate(-1);

  const handleAnswerSelect = (questionIndex, answerId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerId }));
  };

  const onSubmitQuizAnswers = async () => {
    const answers = Object.values(selectedAnswers);
    const response = await submitQuizAnswers({ answers });

    if (response.status === 201) {
      const result = response.data;
      setQuizResult(result);

      const score = result.correctAnswers / result.totalAnswers;
      const isPassed = score >= QUIZ_PASS_THRESHOLD;

      if (quizContext) {
        // Optimistic update
        setProgress(prev => {
          if (!prev) return prev;
          const updated = {
            ...prev,
            syllabusProgress: [...(prev.syllabusProgress || [])],
          };
          const sp = updated.syllabusProgress.find(
            sp => String(sp.syllabusId) === String(quizContext.syllabusId),
          );
          if (!sp) return updated;
          const lp = sp.levels.find(
            lp => String(lp.levelId) === String(quizContext.levelId),
          );
          if (!lp) return updated;
          lp.quizPassed = isPassed;
          lp.completed = lp.videoCompleted && lp.quizPassed;
          return updated;
        });

        // Send to backend
        await completeSyllabusLevel({
          syllabusId: quizContext.syllabusId,
          levelId: quizContext.levelId,
          courseId: id,
          completionType: 'quiz',
          isPassed,
        });

        // Merge backend progress
        const backendProgress = await getUserProgressByCourseId(id);
        setProgress(prev => {
          if (!prev) return backendProgress.data;
          const merged = { ...backendProgress.data };
          merged.syllabusProgress = merged.syllabusProgress.map(sp => {
            const localSp = prev.syllabusProgress?.find(
              lsp => String(lsp.syllabusId) === String(sp.syllabusId),
            );
            if (!localSp) return sp;
            sp.levels = sp.levels.map(lp => {
              const localLp = localSp.levels?.find(
                llp => String(llp.levelId) === String(lp.levelId),
              );
              if (!localLp) return lp;
              return {
                ...lp,
                videoCompleted: lp.videoCompleted || localLp.videoCompleted,
                quizPassed: lp.quizPassed || localLp.quizPassed,
                completed:
                  (lp.videoCompleted || localLp.videoCompleted) &&
                  (lp.quizPassed || localLp.quizPassed),
              };
            });
            return sp;
          });
          return merged;
        });
      }
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

            <div className={styles.videoLessonsAccordionContainer}>
              {(data?.syllabus || []).map((syllabusData, index) => (
                <Accordion
                  title={syllabusData.title}
                  key={syllabusData._id || index}
                >
                  <div className={styles.syllabusContainer}>
                    {(syllabusData.levels || []).map((level, levelIndex) => (
                      <div className={styles.syllabusItem} key={levelIndex}>
                        <div className={styles.syllabusItemInnerContainer}>
                          <FileIcon />
                          <div>{level.title}</div>
                        </div>

                        <div className={styles.syllabusInfoContainer}>
                          {(level.quiz || []).length > 0 && (
                            <div className={styles.quizz}>
                              <button
                                className={styles.quizzBtn}
                                disabled={
                                  isLevelQuizCompleted(
                                    syllabusData._id,
                                    level._id,
                                  ) || // permanently disable if quiz passed
                                  !isLevelVideoCompleted(
                                    syllabusData._id,
                                    level._id,
                                  ) // require video first
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
                                  isLevelQuizCompleted(
                                    syllabusData._id,
                                    level._id,
                                  ) ||
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
                                  videoCompletedRef.current = false;
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
                : 'არასაკმარისი ქულა. გთხოვთ, გაიმეოროთ მცდელობა.'}
            </div>
            <Button
              type="primary"
              onClick={handleCancelQuiz}
              style={{ marginTop: '20px' }}
            >
              დახურვა
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
                    isLevelCompleted(
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
