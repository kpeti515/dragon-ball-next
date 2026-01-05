import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.message}>Not Found</h2>
      <p className={styles.message}>Could not find requested resource, maybe the API is down</p>
      <Link href="/" className={styles.returnBtn}>Return Home</Link>
    </div>
  )
}