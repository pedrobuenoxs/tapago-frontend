import React from "react";
import Link from "next/link";
import styles from "./Competitor.module.css";

const Competitor = ({ iid, name, imgURL, userGroups, rank }) => {
  const monthDays = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  return (
    <div className={styles.card}>
      <div className={styles.rank}>{rank}º</div>
      <div className={styles.imageAndName}>
        <div className={styles.image}></div>
        <h2 className={styles.name}>
          <Link href={`/user/search?id=${iid}`}>{name}</Link>
        </h2>
      </div>
      <div className={styles.info}>
        {
          <>
            <div className={styles.groups}>
              <div className={styles.date}>
                {userGroups[0].monthScore.toString().padStart(2, "0")}
              </div>
              <div className={styles.separator}>/</div>
              <div
                className={styles.value}
                style={{
                  fontSize: `${userGroups[0].monthScore > 99 ? 10 : 14}px`,
                  lineHeight: `${1 + (99 - userGroups[0].monthScore) / 200}`,
                }}
              >
                {monthDays}
              </div>
            </div>
            <div className={styles.groups}>
              <div className={styles.date}>{userGroups[0].score}</div>
              <div className={styles.separator}>/</div>
              <div
                className={styles.value}
                style={{
                  fontSize: `${userGroups[0].biggestScore > 99 ? 10 : 14}px`,
                  lineHeight: `${1 + (99 - userGroups[0].biggestScore) / 200}`,
                }}
              >
                {userGroups[0].biggestScore}365
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Competitor;
