import React from 'react'
import styles from './CoursesTab.module.css'
import Pagination from '../../../../components/UI/Pagination/Pagination'
import { Card } from '../../../../components/UI/Card/Card'

function CoursesTab({ hideTitle }) {
  return (
    <div className={styles.coursesContainer}>
      <div className={styles.coursesTitle} style={{ display: hideTitle ? 'none' : 'block' }}>
        Let's start learning, Kevin
      </div>

      <div className={styles.cardsContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className={styles.paginationContainer}>
        <Pagination totalItems="9" pageSize="3" currentPage="1" />
      </div>
    </div>
  )
}

export default CoursesTab
