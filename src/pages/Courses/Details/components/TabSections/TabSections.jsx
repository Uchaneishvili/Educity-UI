import React, { useState } from "react";
import styles from "./TabSections.module.css";
import { PaginationButton } from "../../../../../components/UI/PaginationButton/PaginationButton";
import { ArrowIcon } from "../../../../../components/UI/icons";
import { Accordion } from "../../../../../components/UI/Accordion/Accordion";
import {
  FileIcon,
  CompleteCheckIcon,
} from "../../../../../components/UI/icons";
import { Feedback } from "../../../../../components/UI/Feedback/Feedback";
import Pagination from "../../../../../components/UI/Pagination/Pagination";

const TabSections = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "კურსის შესახებ" },
    { id: 1, label: "სილაბუსი" },
    { id: 2, label: "შეფასება" },
    { id: 3, label: "დაგვიკავშირდით" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            } ${index > 0 ? styles.border : ""}`}
          >
            {tab.label}

            <div className={styles.switchTabIcon}>
              <PaginationButton
                label={<ArrowIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the tab click from firing

                  setActiveTab(tab.id + 1); // Wrap around to the first tab
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 0 && (
          <>
            <div>
              LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
              This is one of the best WordPress LMS Plugins which can be used to
              easily create & sell courses online. You can create a course
              curriculum with lessons & quizzes included which is managed with
              an easy-to-use interface for users. Having this WordPress LMS
              Plugin, now you have a chance to quickly and easily create
              education, online school, online-course websites with no coding
              knowledge required.
            </div>
            <div>
              LearnPress is free and always will be, but it is still a premium
              high-quality WordPress Plugin that definitely helps you with
              making money from your WordPress Based LMS. Just try and see how
              amazing it is. LearnPress WordPress Online Course plugin is
              lightweight and super powerful with lots of Add-Ons to empower its
              core system.How to use WPML Add-on for LearnPress? No comments
              yet! You be the first to comment.
            </div>

            <div>სერთიფიკატი: yes</div>
            <div>სერთიფიკატი: yes</div>
          </>
        )}

        {activeTab === 1 && (
          <>
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
                      <button className={styles.quizzBtn}> ქვიზის</button>
                    </div>
                    <div className={styles.duration}>10:05</div>
                    <div className={styles.isCompleted}>
                      <CompleteCheckIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

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
                      <button className={styles.quizzBtn}> ქვიზი</button>
                    </div>
                    <div className={styles.duration}>10:05</div>
                    <div className={styles.isCompleted}>
                      <CompleteCheckIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

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
                      <button className={styles.quizzBtn}> ქვიზი</button>
                    </div>
                    <div className={styles.duration}>10:05</div>
                    <div className={styles.isCompleted}>
                      <CompleteCheckIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

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
                      <button className={styles.quizzBtn}> ქვიზი</button>
                    </div>
                    <div className={styles.duration}>10:05</div>
                    <div className={styles.isCompleted}>
                      <CompleteCheckIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

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
                      <button className={styles.quizzBtn}>Preview</button>
                    </div>
                    <div className={styles.duration}>10:05</div>
                    <div className={styles.isCompleted}>
                      <CompleteCheckIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          </>
        )}

        {activeTab === 2 && (
          <>
            <div className={styles.courseReviewHeaderContainer}>
              <div className={styles.reviewPoint}>4.0</div>
              <div>
                <Feedback starsAmount="4" />
                <div className={styles.reviewAmount}>
                  based on 146,951 ratings
                </div>
              </div>
            </div>
            <div className={styles.reviewPercentageTabsContainer}>
              <div className={styles.reviewPercentageTabContainer}>
                <Feedback starsAmount="5" />
                <div className={styles.reviewPercentage}>90%</div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div className={styles.reviewPercentageTabContainer}>
                <Feedback starsAmount="4" />
                <div className={styles.reviewPercentage}>5%</div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{ width: "5%" }}
                  ></div>
                </div>
              </div>
              <div className={styles.reviewPercentageTabContainer}>
                <Feedback starsAmount="3" />
                <div className={styles.reviewPercentage}>2%</div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{ width: "2%" }}
                  ></div>
                </div>
              </div>
              <div className={styles.reviewPercentageTabContainer}>
                <Feedback starsAmount="2" />
                <div className={styles.reviewPercentage}>2%</div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{ width: "2%" }}
                  ></div>
                </div>
              </div>
              <div className={styles.reviewPercentageTabContainer}>
                <Feedback starsAmount="1" />
                <div className={styles.reviewPercentage}>1%</div>
                <div className={styles.reviewPercentageEmptyLine}>
                  <div
                    className={styles.reviewPercentageFilledLine}
                    style={{ width: "1%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={styles.reviewPeopleContainer}>
              <div className={styles.reviewPersonContainer}>
                <div className={styles.reviewPersonPhotoContainer}>
                  <img src="/assets/UserPhoto.png" alt="personAvatar" />
                </div>
                <div className={styles.reviewPersonCommentContainer}>
                  <div className={styles.reviewPersonCommentInfo}>
                    <div className={styles.reviewPersonCommentName}>
                      Laura Hipster
                    </div>
                    <div className={styles.reviewPersonCommentDate}>
                      October 03, 2024
                    </div>
                  </div>
                  <div className={styles.reviewPersonComment}>
                    Quisque nec non amet quis. Varius tellus justo odio
                    parturient mauris curabitur lorem in. Pulvinar sit ultrices
                    mi ut eleifend luctus ut. Id sed faucibus bibendum augue id
                    cras purus. At eget euismod cursus non. Molestie dignissim
                    sed volutpat feugiat vel.
                  </div>
                </div>
              </div>
              <div className={styles.reviewPersonContainer}>
                <div className={styles.reviewPersonPhotoContainer}>
                  <img src="/assets/UserPhoto.png" alt="personAvatar" />
                </div>
                <div className={styles.reviewPersonCommentContainer}>
                  <div className={styles.reviewPersonCommentInfo}>
                    <div className={styles.reviewPersonCommentName}>
                      Laura Hipster
                    </div>
                    <div className={styles.reviewPersonCommentDate}>
                      October 03, 2024
                    </div>
                  </div>
                  <div className={styles.reviewPersonComment}>
                    Quisque nec non amet quis. Varius tellus justo odio
                    parturient mauris curabitur lorem in. Pulvinar sit ultrices
                    mi ut eleifend luctus ut. Id sed faucibus bibendum augue id
                    cras purus. At eget euismod cursus non. Molestie dignissim
                    sed volutpat feugiat vel.
                  </div>
                </div>
              </div>
              <div className={styles.reviewPersonContainer}>
                <div className={styles.reviewPersonPhotoContainer}>
                  <img src="/assets/UserPhoto.png" alt="personAvatar" />
                </div>
                <div className={styles.reviewPersonCommentContainer}>
                  <div className={styles.reviewPersonCommentInfo}>
                    <div className={styles.reviewPersonCommentName}>
                      Laura Hipster
                    </div>
                    <div className={styles.reviewPersonCommentDate}>
                      October 03, 2024
                    </div>
                  </div>
                  <div className={styles.reviewPersonComment}>
                    Quisque nec non amet quis. Varius tellus justo odio
                    parturient mauris curabitur lorem in. Pulvinar sit ultrices
                    mi ut eleifend luctus ut. Id sed faucibus bibendum augue id
                    cras purus. At eget euismod cursus non. Molestie dignissim
                    sed volutpat feugiat vel.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.paginationContainer}>
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabSections;
