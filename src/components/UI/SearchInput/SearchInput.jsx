import React from 'react'
import styles from './SearchInput.module.css'
import { FilterIcon, SearchIcon } from '../icons'

const SearchInput = ({ placeholder = 'ძიება...' }) => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.filterIconWrapper}>
        <FilterIcon />
      </span>
      <input type="text" className={styles.searchInput} placeholder={placeholder} />
      <span className={styles.searchIconWrapper}>
        <SearchIcon />
      </span>
    </div>
  )
}

export default SearchInput
