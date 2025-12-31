import React, { useCallback, useEffect, useState } from 'react';
import styles from './Syllabus.module.css';
import { Accordion } from '../../../../../../../components/UI/Accordion/Accordion';
import { FileIcon, CloseIcon } from '../../../../../../../components/UI/icons';
import { getSyllabusByCourseId } from '../../../../../../../services/syllabus.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../../../../../components/UI/Loader/Loader';
import { Video } from '../../../../../../../components/VideoPlayer/Video';
import Modal from '../../../../../../../components/UI/Modal/Modal';
import { useAuth } from '../../../../../../../context/AuthContext';

function Syllabus({ courseType, hasAccess }) {
  const [syllabusData, setSyllabusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //
  const loadSyllabusData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getSyllabusByCourseId(id);
      setSyllabusData(data.data.syllabus);
    } catch {
      console.log('error while loading syllabus data');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadSyllabusData();
  }, [loadSyllabusData]);

  // Get all levels across all syllabuses to determine first 3 videos
  const getAllLevels = () => {
    const allLevels = [];
    syllabusData.forEach(syllabus => {
      syllabus.levels?.forEach(level => {
        if (level.videoUrl) {
          allLevels.push({
            ...level,
            syllabusId: syllabus._id,
            syllabusTitle: syllabus.title,
          });
        }
      });
    });
    return allLevels;
  };

  const allLevels = getAllLevels();
  const isVideoLecture = courseType === 'video-lecture';

  // Get first 3 videos for preview (available for everyone)
  const previewLevels = isVideoLecture ? allLevels.slice(0, 3) : [];
  const previewLevelIds = new Set(previewLevels.map(l => l._id));

  const handleVideoClick = level => {
    if (previewLevelIds.has(level._id)) {
      // Show preview video (available for everyone)
      setSelectedVideo(level.videoUrl);
      setSelectedVideoTitle(level.title);
    } else if (hasAccess) {
      // Navigate to full video lecture page for purchased users
      navigate(`/courses/${id}/videos`);
    } else {
      // Navigate to checkout/login for non-preview videos
      if (!isAuthenticated) {
        navigate('/login', {
          state: { from: `/courses/${id}` },
        });
      } else {
        navigate(`/checkout/${id}`);
      }
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setSelectedVideoTitle(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {syllabusData.map(syllabus => (
        <Accordion title={syllabus.title} key={syllabus._id}>
          <div className={styles.syllabusContainer}>
            {syllabus.levels.map((level, levelIndex) => {
              const isPreviewVideo = previewLevelIds.has(level._id);

              return (
                <div
                  className={styles.syllabusItem}
                  key={level._id || levelIndex}
                >
                  <div
                    className={styles.syllabusItemInnerContainer}
                    style={{
                      cursor: level.videoUrl ? 'pointer' : 'default',
                      flex: 1,
                    }}
                    onClick={() =>
                      level.videoUrl &&
                      handleVideoClick({ ...level, syllabusId: syllabus._id })
                    }
                  >
                    <div>
                      <FileIcon />
                    </div>
                    <div>{level.title}</div>
                  </div>

                  <div className={styles.syllabusInfoContainer}>
                    {/* Show preview button for first 3 videos if user doesn't have access */}
                    {isPreviewVideo && (
                      <div className={styles.quizz}>
                        <button
                          className={styles.quizzBtn}
                          onClick={e => {
                            e.stopPropagation();
                            handleVideoClick({
                              ...level,
                              syllabusId: syllabus._id,
                            });
                          }}
                        >
                          ლექციის ჩანაწერი
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Accordion>
      ))}

      {/* Video Preview Modal */}
      {selectedVideo && (
        <Modal isOpen={true} width="80%" onClose={closeVideoModal}>
          <div className={styles.videoModalContainer}>
            <div className={styles.videoModalHeader}>
              <h3>{selectedVideoTitle}</h3>
              <button className={styles.closeButton} onClick={closeVideoModal}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.videoModalContent}>
              <Video
                playbackId={selectedVideo}
                thumbnail=""
                size="100%"
                onEnded={() => {}}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Syllabus;
