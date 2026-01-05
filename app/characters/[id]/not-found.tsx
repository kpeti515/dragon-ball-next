import Link from 'next/link'
import styles from '../not-found.module.css'

export default function NotFound() {
  return (
    <div>
      <h2>Character not found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className={styles.returnBtn}>Return Home</Link>
    </div>
  )
}