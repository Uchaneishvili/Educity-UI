import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import TabSelector from '../../components/UI/TabSelector/TabSelector'
import LoginForm from './Components/Login/LoginForm'
import RegisterForm from './Components/Register/RegisterForm'
import { OrDivider } from '../../components/UI/OrDivider/OrDivider'
import { FacebookAuthIcon, GoogleAuthIcon } from '../../components/UI/icons'

export function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (location.pathname === '/register') {
      setActiveTab(1)
    } else if (location.pathname === '/login') {
      setActiveTab(0)
    }
  }, [location.pathname])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    navigate(tabId === 0 ? '/login' : '/register')
  }

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
                onTabChange={handleTabChange}
                activeTab={activeTab}
              />
            </div>

            {activeTab === 0 ? <LoginForm /> : <RegisterForm setActiveTab={setActiveTab} />}

            <OrDivider />

            <div className={styles.socialContainer}>
              <div className={styles.socialItem}>
                <FacebookAuthIcon />
              </div>
              <div className={styles.socialItem}>
                <GoogleAuthIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" alt="banner" />
        </div>
      </div>
    </div>
  )
}
