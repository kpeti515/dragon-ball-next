import Link from 'next/link'
import styles from './characters/not-found.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DB-DEX: Resource Not Found',
    description: 'The requested page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.message}>This page cannot be found in this universe</h2>
      <p className={styles.message}>Probably the link is broken or the page has been moved</p>
      <Link href="/" className={styles.returnBtn}>Return Home</Link>
    </div>
  )
}
