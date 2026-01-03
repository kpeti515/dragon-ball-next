import styles from './page.module.css';
import Header from './components/Header';
import Image from 'next/image';
import CharacterCard from './components/CharacterCard';

async function fetchCharacters(limit = 100) {
  const url = `https://dragonball-api.com/api/characters?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch characters: ${res.status}`);
  }
  const data = await res.json();
  return data.items ?? [];
}

export default async function Home() {
  let items = [];
  try {
    items = await fetchCharacters(100);
  } catch (err) {
    console.error('Error fetching characters:', err);
    items = [];
  }

  return (
    <main style={{minHeight:'100vh',paddingBottom:48}}>
      <div className={styles.container}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>UNLEASH THE POWER</p>
            <h1 id="hero-title" className={styles.title}>Explore the legends of the 7 Universes</h1>
            <p style={{color:'#cfe7ff'}}>Start exploring detailed character profiles, transformations, and power levels.</p>
            <div style={{marginTop:18}}>
              <a className={styles.cta} href="#roster">Start Exploring</a>
            </div>

            <ul className={styles.stats} aria-label="Highlights">
              <li className={styles.stat}><strong>Total Fighters:</strong> {items.length}</li>
              <li className={styles.stat}><strong>Unique Sagas:</strong> 12</li>
              <li className={styles.stat}><strong>Transformations:</strong> 80+</li>
            </ul>
          </div>

          <div className={styles.heroImage} aria-hidden="true">
            <Image src="/images/hero-goku.png" alt="Goku aura" width={360} height={360} />
          </div>
        </section>

        <section className={styles.roster} id="roster" aria-labelledby="roster-heading">
          <h2 id="roster-heading" style={{color:'#fff'}}>Roster</h2>
          <ul className={styles.grid} role="list">
            {items.map((c: any) => (
              <li key={c.id} role="listitem">
                <CharacterCard character={c} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}