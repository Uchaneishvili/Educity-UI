import React from 'react'
import styles from './Auth.module.css'
import { Divider } from '../../components/UI/icons'
import TabSelector from '../../components/UI/TabSelector/TabSelector'
import LoginForm from './Components/Login/LoginForm'

export function Auth() {
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
              />
            </div>

            <LoginForm />

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
