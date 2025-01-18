import React, { useState } from 'react'
import { Card } from '../../components/UI/Card/Card'
import Checkbox from '../../components/UI/Checkbox/Checkbox'
import Input from '../../components/UI/Input/Input'
import styles from './Login.module.css'
import { Button } from '../../components/UI/Button/Button'
import { Divider } from '../../components/UI/icons'
import TabSelector from '../../components/UI/TabSelector/TabSelector'
import { authService } from '../../services/auth.service'

export function Login() {
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData.entries())

    const res = await authService.login(values)
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
              <TabSelector />
            </div>
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
              <Input name="email" placeholder={'ელ.ფოსტა'} />
              <Input name="password" placeholder={'პაროლი'} />

              <div className={styles.inputContainerFooter}>
                <div className={styles.saveUserContainer}>
                  <Checkbox
                    name="rememberMe"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span className={styles.saveUser}> მომხმარებლის დამახსოვრება</span>
                </div>

                <div className={styles.forgotPassword}>დაგავიწყდათ პაროლი?</div>
              </div>
              <div className={styles.loginBtnContainer}>
                <Button width="40%" type="primary">
                  ავტორიზაცია
                </Button>
              </div>
            </form>

            <Divider />
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src="./assets/loginBanner.png" />{' '}
        </div>
      </div>
    </div>
  )
}
