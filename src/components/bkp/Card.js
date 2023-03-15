import React, { useState } from "react";
import styles from "./Card.module.css";

function Card({ record }) {
  const { user, date, time, score, group } = record;
  console.log(record);
  const initial = user?.name[0].toUpperCase();
  const emoji = getEmoji(time);

  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        onClick={handleClick}
      >
        <div className={styles.front}>
          <div className={styles.avatar}>{initial}</div>
          <div className={styles.details}>
            <div className={styles.name}>{user?.name}</div>
            <div className={styles.date}>{date}</div>
          </div>
          <div className={styles.emoji}>{emoji}</div>
        </div>
        <div className={styles.back}>
          <div className={styles.score}>{score != "false" ? score : "✅"}</div>
          <div className={styles.group}>{group?.name}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.like}>Like</button>
        <button className={styles.comment}>Comment</button>
      </div>
    </div>
  );
}

function getEmoji(time) {
  if (!time) {
    return "🌞";
  }

  const hour = parseInt(time.split(":")[0]);
  if (hour >= 5 && hour < 12) {
    return "🌞";
  } else if (hour >= 12 && hour < 18) {
    return "🌤";
  } else {
    return "🌙";
  }
}

export default Card;
