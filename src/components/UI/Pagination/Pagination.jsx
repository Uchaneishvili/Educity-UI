import React, { useMemo } from 'react'
import styles from './Pagination.module.css'
import FormatData from '../../../utils/FormatData'
import { PaginationButton } from '../PaginationButton/PaginationButton'

const Pagination = ({
  totalItems,
  pageSize = 10,
  currentPage = 1,
  pathPrefix,
  sortField,
  sortOrder,
  filters = {},
  customSearch = {},
  staticFilter = {},
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const generatePageURL = (page) => {
    return FormatData.generatePaginationURLPath({
      page,
      pageSize,
      pathPrefix,
      sortField,
      sortOrder,
      filters,
      customSearch,
      staticFilter
    })
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const pageURL = generatePageURL(page)

      window.history.pushState({}, '', pageURL)

      if (onPageChange) {
        onPageChange(page, pageURL)
      }
    }
  }

  const pageNumbers = useMemo(() => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationButton
          key={i}
          href={generatePageURL(i)}
          onClick={(e) => {
            e.preventDefault()
            handlePageChange(i)
          }}
          label={i}
          isActive={Boolean(currentPage === i)}
        />
      )
    }
    return pages
  }, [totalPages, currentPage])

  return (
    <div className={styles.pagination}>
      <PaginationButton
        href={generatePageURL(currentPage - 1)}
        className={styles.navButton}
        onClick={(e) => {
          e.preventDefault()
          handlePageChange(currentPage - 1)
        }}
        disabled={currentPage === 1}
        label={'<'}
      />

      {pageNumbers}

      <PaginationButton
        href={generatePageURL(currentPage + 1)}
        className={styles.navButton}
        onClick={(e) => {
          e.preventDefault()
          handlePageChange(currentPage + 1)
        }}
        label={'>'}
      />
    </div>
  )
}

export default Pagination
