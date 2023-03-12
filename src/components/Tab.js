import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Tab.module.css";

function Tab() {
  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.tab}>
      <div className={styles.tabButtons}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 0 ? styles.activeTabButton : ""
          }`}
          onClick={() => handleClick(0)}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 1 ? styles.activeTabButton : ""
          }`}
          onClick={() => handleClick(1)}
        >
          <FontAwesomeIcon icon={faClock} />
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 2 ? styles.activeTabButton : ""
          }`}
          onClick={() => handleClick(2)}
        >
          <FontAwesomeIcon icon={faChartLine} />
        </button>
      </div>
    </div>
  );
}

export default Tab;
