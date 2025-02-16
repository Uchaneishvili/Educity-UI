import React, { useState } from 'react'
import styles from './SubscribeInput.module.css'
import { subscribeToCourse } from '../../../services/subscribe.service'
export function SubscribeInput({ inputPlaceholder, buttonName }) {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (email) => {
    try {
      await subscribeToCourse(email)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.subscribeInputContainer}>
      <input
        type="email"
        placeholder={inputPlaceholder}
        name="subscribe-email"
        className={styles.subscribeInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.subscribeButton} onClick={() => handleSubscribe(email)}>
        {buttonName}
      </button>
    </div>
  )
}
