import React, { useState } from 'react';
import styles from './Sorting.module.css';
import { ArrowDownIcon, ArrowUpIcon } from '../icons';

const Sorting = ({ options, onSortChange, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0],
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option);
    }
  };

  return (
    <div className={styles.sortingContainer}>
      <button onClick={toggleDropdown} className={styles.sortingButton}>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        <span>{selectedOption.label || 'სორტირება'}</span>
      </button>

      {isOpen && (
        <div className={styles.optionsContainer}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                selectedOption.value === option.value ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sorting;
