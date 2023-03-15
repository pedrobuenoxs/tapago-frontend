import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Tab.module.css";

import { useRouter } from "next/router";

function Tab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  const getActiveTabIndex = () => {
    switch (router.pathname) {
      case "/profile":
        return 0;
      case "/":
        return 1;
      case "/ranking":
        return 2;
      default:
        return -1;
    }
  };

  useEffect(() => {
    setActiveTab(getActiveTabIndex());
  }, [router.pathname]);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.tab}>
      <div className={styles.tabButtons}>
        <Link
          className={`${styles.tabButton} ${
            activeTab === 0 ? styles.activeTabButton : ""
          }`}
          href="/profile"
        >
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link
          className={`${styles.tabButton} ${
            activeTab === 1 ? styles.activeTabButton : ""
          }`}
          href="/"
        >
          <FontAwesomeIcon icon={faClock} />
        </Link>
        <Link
          className={`${styles.tabButton} ${
            activeTab === 2 ? styles.activeTabButton : ""
          }`}
          href="/ranking"
        >
          <FontAwesomeIcon icon={faChartLine} />
        </Link>
      </div>
    </div>
  );
}

export default Tab;
