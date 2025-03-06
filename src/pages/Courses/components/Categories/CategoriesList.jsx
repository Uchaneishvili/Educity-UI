import React from 'react';
import styles from './CategoriesList.module.css';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';

const CategoriesList = ({ data, onCategoryChange, initialSelected = [] }) => {
  const handleCheckboxChange = categoryId => {
    const updatedCategories = initialSelected.includes(categoryId)
      ? initialSelected.filter(id => id !== categoryId)
      : [...initialSelected, categoryId];

    onCategoryChange(updatedCategories);
  };

  return (
    <div className={styles.container}>
      {data.map(category => (
        <div key={category._id} className={styles.categoryItem}>
          <Checkbox
            checked={initialSelected.includes(category._id)}
            onChange={() => handleCheckboxChange(category._id)}
          />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
