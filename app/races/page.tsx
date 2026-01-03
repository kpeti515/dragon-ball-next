import Link from 'next/link'

async function fetchRaces() {
  const res = await fetch('https://dragonball-api.com/api/characters?limit=100')
  if (!res.ok) return []
  const data = await res.json()
  const items = data.items ?? []
  const races = Array.from(new Set(items.map((c: any) => c.race).filter(Boolean)))
  return races
}

export default async function RacesPage() {
  const races = await fetchRaces()
  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Races</h1>
      <ul style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {races.map((r: string) => (
          <li key={r}><Link href={`/races/${encodeURIComponent(r)}`} style={{color:'#9fd3ff'}}>{r}</Link></li>
        ))}
      </ul>
    </main>
  )
}
