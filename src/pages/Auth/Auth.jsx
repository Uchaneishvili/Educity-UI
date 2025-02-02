import React, { useState } from 'react'
import styles from './Auth.module.css'
import { Divider } from '../../components/UI/icons'
import TabSelector from '../../components/UI/TabSelector/TabSelector'
import LoginForm from './Components/Login/LoginForm'
import RegisterForm from './Components/Register/RegisterForm'

export function Auth() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.welcomeContainer}>
              <div className={styles.title}>მოგესალმებით</div>
              <div className={styles.description}>
                გთხოვთ გაიაროთ ავტორიზაცია, თუ არ გაქვთ ანგარიში გაიარეთ რეგისრაცია, რათა ისარგებლოთ
                ჩვენი სერვისებით
              </div>
            </div>

            <div className={styles.tabSelectorContainer}>
              <TabSelector
                tabs={[
                  { id: 0, label: 'ავტორიზაცია' },
                  { id: 1, label: 'რეგისტრაცია' }
                ]}
                onTabChange={setActiveTab}
                activeTab={activeTab}
              />
            </div>

            {activeTab === 0 ? <LoginForm /> : <RegisterForm setActiveTab={setActiveTab} />}

            <Divider />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" />
        </div>
      </div>
    </div>
  )
}
