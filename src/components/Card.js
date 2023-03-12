import React from "react";
import styles from "./Card.module.css";

function Card({ record }) {
  const { user, date, time, score, group } = record;
  const initial = user.name[0].toUpperCase();
  let hour = 10;
  let theme = "morning";
  if (time) {
    hour = parseInt(time.split(":")[0]);
  }

  if (hour >= 5 && hour < 12) {
    theme = "morning";
  } else if (hour >= 12 && hour < 18) {
    theme = "afternoon";
  } else {
    theme = "night";
  }

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <div className={styles.avatar}>{initial}</div>
      <div className={styles.details}>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.date}>{date}</div>
      </div>

      <div className={styles.score}>{score != "false" ? score : "✅"}</div>
      <div className={styles.group}>{group.name}</div>
    </div>
  );
}

export default Card;
