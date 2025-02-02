import styles from './TabSelector.module.css'

const TabSelector = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default TabSelector
