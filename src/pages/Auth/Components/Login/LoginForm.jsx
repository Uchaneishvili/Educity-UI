import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import { Button } from '../../../../components/UI/Button/Button'
import Checkbox from '../../../../components/UI/Checkbox/Checkbox'
import Input from '../../../../components/UI/Input/Input'
import AuthService from '../../../../services/auth.service'

const authService = new AuthService()

function LoginForm() {
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = Object.fromEntries(formData.entries())

    const res = await authService.login(values)
    if (res.success) {
      navigate('/')
    } else {
      console.error('Login failed:', res.error)
    }
  }

  return (
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
  )
}

export default LoginForm
