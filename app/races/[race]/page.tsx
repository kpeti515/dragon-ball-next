import CharacterCard from '../../components/CharacterCard'
import styles from '../../page.module.css'
import { fetchCharacters } from '../../lib/db-api-calls/fetchCharacters'

async function fetchByRace(race: string) {
  const url = `https://dragonball-api.com/api/characters?race=${encodeURIComponent(race)}`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function generateStaticParams() {
  try {
    const all = await fetchCharacters({ fetchAll: true })
    const races = Array.from(new Set(all.map((c) => c.race).filter(Boolean))) as string[]
    return races.map((race) => ({ race }))
  } catch (e) {
    return []
  }
}

export default async function RacePage({ params }: { params: Promise<{ race: string }> }) {
  const { race } = await params
  const data: any = await fetchByRace(race)
  const items = data ?? []
  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Race: {race}</h1>
      <ul className={styles.grid} role="list">
        {items.map((c: any) => (
          <li key={c.id} role="listitem">
            <CharacterCard character={c} />
          </li>
        ))}
      </ul>
    </main>
  )
}
