import React from "react";
import styles from "./Feedback.module.css";
import { FeedbackStar } from "../icons";

export function Feedback({ starsAmount }) {
  const stars = [];
  const emptyStars = 5 - starsAmount;

  for (let i = 0; i < starsAmount; i++) {
    stars.push(<FeedbackStar key={i} />);
  }

  for (let k = 0; k < emptyStars; k++) {
    stars.push("empty");
  }

  return <div className={styles.feedbackStars}>{stars}</div>;
}
