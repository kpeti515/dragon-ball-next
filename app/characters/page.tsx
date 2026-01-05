import CharacterCard from '../components/CharacterCard'
import styles from '../page.module.css'
import { fetchCharacters } from '../lib/db-api-calls/fetchCharacters'
import { notFound } from 'next/navigation'

export default async function CharactersPage() {
  const characters = await fetchCharacters({fetchAll:true});
  if (!characters || characters.length === 0) {
    notFound()
  }

  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Characters</h1>
      <p style={{color:'#cfe7ff'}}>Browse all characters. Click a card for details.</p>

      <ul className={styles.grid} role="list">
        {characters.map((c: any) => (
          <li key={c.id} role="listitem">
            <CharacterCard character={c} />
          </li>
        ))}
      </ul>
    </main>
  )
}
