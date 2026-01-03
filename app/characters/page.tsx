import Link from 'next/link'
import CharacterCard from '../components/CharacterCard'
import styles from '../page.module.css'

async function fetchCharacters(limit = 100) {
  const url = `https://dragonball-api.com/api/characters?limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch characters')
  const data = await res.json()
  return data.items ?? []
}

export default async function CharactersPage() {
  let items = []
  try {
    items = await fetchCharacters(100)
  } catch (err) {
    console.error('Error fetching characters:', err)
    items = []
  }

  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Characters</h1>
      <p style={{color:'#cfe7ff'}}>Browse all characters. Click a card for details.</p>

      <ul className={styles.grid} role="list">
        {items.map((c: any) => (
          <li key={c.id} role="listitem">
            <Link href={`/characters/${c.id}`}>
              <CharacterCard character={c} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
