import React, { useState, useRef } from 'react'
import styles from './DatePicker.module.css'

const DatePicker = ({ id, name, placeholder, defaultValue, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(defaultValue || '')
  const [showCalendarIcon, setShowCalendarIcon] = useState(true)
  const [isInputDate, setIsInputDate] = useState(false)
  const inputRef = useRef(null)

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const handleFocus = () => {
    setShowCalendarIcon(false)
    setIsInputDate(true)
  }

  const handleBlur = () => {
    if (!selectedDate) {
      setShowCalendarIcon(true)
      setIsInputDate(false)
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      if (inputRef.current.showPicker) {
        inputRef.current.showPicker()
      }
    }
  }

  return (
    <div className={styles.datePickerContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <div className={styles.datePickerWrapper}>
        <input
          ref={inputRef}
          type={isInputDate ? 'date' : 'text'}
          id={id}
          name={name}
          value={selectedDate}
          onChange={handleDateChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.datePicker}
          placeholder={isInputDate ? '' : placeholder}
        />
        {showCalendarIcon && (
          <span className={styles.iconButton} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
        )}
      </div>
    </div>
  )
}

export default DatePicker
