import { useState } from "react";
import styles from "./TabSelector.module.css";

const TabSelector = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <>
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
          >
            {tab.label}
          </div>
        </>
      ))}
    </div>
  );
};

export default TabSelector;
