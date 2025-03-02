import React, { useState } from "react";
import styles from "./TabSections.module.css";
import { PaginationButton } from "../../../../../components/UI/PaginationButton/PaginationButton";
import { ArrowIcon } from "../../../../../components/UI/icons";
import AboutCourse from "./components/AboutCourse/AboutCourse";
import Syllabus from "./components/Syllabus/Syllabus";
import CourseReview from "./components/CourseReview/CourseReview";
import CourseContact from "./components/CourseContact/CourseContact";

const TabSections = ({ tabs, description, syllabus }) => {
  const [activeTab, setActiveTab] = useState(0);

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
                  if (activeTab === 3) {
                    setActiveTab(0);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 0 && <AboutCourse description={description} />}

        {activeTab === 1 && <Syllabus syllabus={syllabus} />}

        {activeTab === 2 && <CourseReview />}

        {activeTab === 3 && <CourseContact />}
      </div>
    </div>
  );
};

export default TabSections;
