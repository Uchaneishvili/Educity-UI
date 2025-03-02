import React from "react";
import styles from "./CourseReview.module.css";
import { Feedback } from "../../../../../../../components/UI/Feedback/Feedback";
import Pagination from "../../../../../../../components/UI/Pagination/Pagination";

function CourseReview() {
  const reviewStarsData = [
    {
      id: 1,
      stars: <Feedback starsAmount="5" />,
      percentage: "90%",
    },
    {
      id: 2,
      stars: <Feedback starsAmount="4" />,
      percentage: "5%",
    },
    {
      id: 3,
      stars: <Feedback starsAmount="3" />,
      percentage: "2%",
    },
    {
      id: 4,
      stars: <Feedback starsAmount="2" />,
      percentage: "2%",
    },
    {
      id: 5,
      stars: <Feedback starsAmount="1" />,
      percentage: "1%",
    },
  ];

  const personCommentData = [
    {
      id: 1,
      avatar: "/assets/UserPhoto.png",
      fullName: "Laura Hipster",
      date: "October 03, 2024",
      comment:
        "Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    },
    {
      id: 2,
      avatar: "/assets/UserPhoto.png",
      fullName: "Laura Hipster",
      date: "October 03, 2024",
      comment:
        "Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    },
    {
      id: 3,
      avatar: "/assets/UserPhoto.png",
      fullName: "Laura Hipster",
      date: "October 03, 2024",
      comment:
        "Quisque nec non amet quis. Varius tellus justo odio parturientmauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifendluctus ut. Id sed faucibus bibendum augue id cras purus. At egeteuismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    },
  ];
  return (
    <>
      <div className={styles.courseReviewHeaderContainer}>
        <div className={styles.reviewPoint}>4.0</div>
        <div>
          <Feedback starsAmount="4" />
          <div className={styles.reviewAmount}>based on 146,951 ratings</div>
        </div>
      </div>
      <div className={styles.reviewPercentageTabsContainer}>
        {reviewStarsData.map((review) => (
          <div className={styles.reviewPercentageTabContainer} key={review.id}>
            {review.stars}
            <div className={styles.reviewPercentage}>{review.percentage}</div>
            <div className={styles.reviewPercentageEmptyLine}>
              <div
                className={styles.reviewPercentageFilledLine}
                style={{ width: review.percentage }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.reviewPeopleContainer}>
        {personCommentData.map((person) => (
          <div className={styles.reviewPersonContainer} key={person.id}>
            <div className={styles.reviewPersonPhotoContainer}>
              <img src={person.avatar} alt="personAvatar" />
            </div>
            <div className={styles.reviewPersonCommentContainer}>
              <div className={styles.reviewPersonCommentInfo}>
                <div className={styles.reviewPersonCommentName}>
                  {person.fullName}
                </div>
                <div className={styles.reviewPersonCommentDate}>
                  {person.date}
                </div>
              </div>
              <div className={styles.reviewPersonComment}>{person.comment}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <Pagination />
      </div>
    </>
  );
}

export default CourseReview;
