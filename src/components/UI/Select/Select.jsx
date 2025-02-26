import React, { useState } from 'react'
import styles from './Select.module.css'

const Select = ({ id, name, placeholder, options = [], defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultValue || '')

  const handleSelectClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option.value)
    setIsOpen(false)
    if (onChange) {
      onChange(option.value)
    }
  }

  return (
    <div className={styles.selectContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <div className={styles.selectWrapper}>
        <div
          className={`${styles.selectField} ${isOpen ? styles.active : ''}`}
          onClick={handleSelectClick}
        >
          <span className={selectedOption ? styles.selectedText : styles.placeholder}>
            {selectedOption || placeholder}
          </span>
          <span className={styles.iconButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedOption === option.value ? styles.selected : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}

        <select
          id={id}
          name={name}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={styles.hiddenSelect}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Select
