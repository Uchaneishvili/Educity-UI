import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';

const Input = ({
  type,
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || '');

  useEffect(() => {
    if (defaultValue !== undefined) {
      setInputValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = e => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const renderInputIcon = () => {
    if (type === 'password') {
      return (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      );
    } else if (type === 'select') {
      return (
        <span className={styles.iconButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      );
    }
    return null;
  };

  return (
    <div className={styles.inputContainer}>
      {id && <label htmlFor={id}>{name}</label>}
      <div className={styles.inputWrapper}>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          id={id}
          name={name}
          placeholder={placeholder}
          className={styles.input}
          value={value !== undefined ? value : inputValue}
          onChange={handleChange}
        />
        {renderInputIcon()}
      </div>
    </div>
  );
};

export default Input;
