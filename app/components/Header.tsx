import Link from 'next/link';
import styles from './Header.module.css';

export default function Header(){
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoBadge} aria-hidden>★</div>
          <Link href="/" className={`${styles.navLink} ${styles.brand}`}>DB-DEX</Link>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li><Link href="/characters" className={styles.navLink}>Characters</Link></li>
            <li><Link href="/sagas" className={styles.navLink}>Sagas</Link></li>
            <li><Link href="/transformations" className={styles.navLink}>Transformations</Link></li>
            <li><Link href="/techniques" className={styles.navLink}>Techniques</Link></li>
          </ul>
        </nav>

        <div className={styles.controls}>
          <button className={styles.powerBtn} aria-pressed="false">
            <span className={styles.cameraIcon} aria-hidden>📷</span>
            <span className={styles.powerText}>Power Level</span>
            <span className={styles.toggle} aria-hidden>
              <span className={styles.toggleKnob}></span>
            </span>
          </button>
          <button className={styles.iconBtn} aria-label="Toggle theme">◐</button>
        </div>
      </div>
    </header>
  );
}
