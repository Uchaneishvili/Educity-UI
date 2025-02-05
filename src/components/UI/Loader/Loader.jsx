import styles from './Loader.module.css'

export function Loader() {
  return (
    <div className={styles.spinner}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  )
}
