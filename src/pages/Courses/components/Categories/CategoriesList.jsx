import React, { useState } from 'react'
import styles from './CategoriesList.module.css'
import Checkbox from '../../../../components/UI/Checkbox/Checkbox'

const CategoriesList = ({ data, onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleCheckboxChange = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]

    setSelectedCategories(updatedCategories)
    onCategoryChange(updatedCategories)
  }

  return (
    <div className={styles.container}>
      {data.map((category) => (
        <div key={category._id} className={styles.categoryItem}>
          <Checkbox
            checked={selectedCategories.includes(category._id)}
            onChange={() => handleCheckboxChange(category._id)}
          />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  )
}

export default CategoriesList
