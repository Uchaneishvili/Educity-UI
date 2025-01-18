import { useState } from 'react'
import styles from './TabSelector.module.css'

const TabSelector = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 0, label: 'ავტორიზაცია' },
    { id: 1, label: 'რეგისტრაცია' }
  ]

  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <>
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          >
            {tab.label}
          </div>
        </>
      ))}
    </div>
  )
}

export default TabSelector
