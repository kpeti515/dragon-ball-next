import CharacterCard from '../../components/CharacterCard'
import styles from '../../page.module.css'

async function fetchByRace(race: string) {
  const url = `https://dragonball-api.com/api/characters?race=${encodeURIComponent(race)}`
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export default async function RacePage({ params }: { params: { race: string } }) {
  const data: any = await fetchByRace(params.race)
  const items = data ?? []
  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Race: {params.race}</h1>
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
