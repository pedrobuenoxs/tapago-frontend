import React, { useState } from "react";
import styles from "./Stats.module.css";

function Stats({ data }) {
  const [openedGroupIndex, setOpenedGroupIndex] = useState(-1);

  const handleGroupClick = (index) => {
    if (openedGroupIndex === index) {
      setOpenedGroupIndex(-1);
    } else {
      setOpenedGroupIndex(index);
    }
  };

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>Meus números</h2>
      <h3 className={styles.subTitle}>Groupos</h3>
      {data.userGroups.map((group, index) => (
        <div
          key={index}
          className={styles.groupInfo}
          onClick={() => handleGroupClick(index)}
        >
          <div className={styles.header}>
            <h4 className={styles.groupTitle}>{group.name}</h4>
            <p className={styles.text}>
              🔺
              {group.score}
            </p>
          </div>
          {openedGroupIndex === index && (
            <>
              <h5 className={styles.sectionTitle}>Analytics:</h5>
              <p className={styles.text}>
                Average Hour: {group.analytics.hourMedia}
              </p>
              <p className={styles.text}>Days:</p>
              <ul className={styles.list}>
                {Object.entries(group.analytics.days).map(([day, count], i) => (
                  <li className={styles.listItem} key={i}>
                    {day}: {count}
                  </li>
                ))}
              </ul>
              <h5 className={styles.sectionTitle}>Scores:</h5>
              <ul className={styles.list}>
                {group.scores.map((score, i) => (
                  <li className={styles.listItem} key={i}>
                    {score.score} - {score.date.split("/")[0]}/
                    {score.date.split("/")[1]}
                    {" às "}
                    {score.time &&
                      `${score.time.split(":")[0]}:${
                        score.time.split(":")[1]
                      }h`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stats;
