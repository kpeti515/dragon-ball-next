import Link from 'next/link'

const dummySagas = [
  { id: 'saga-1', name: 'Saiyan Saga' },
  { id: 'saga-2', name: 'Frieza Saga' },
  { id: 'saga-3', name: 'Cell Saga' },
]

export default function SagasPage() {
  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Sagas</h1>
      <ul style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {dummySagas.map(s => (
          <li key={s.id}><Link href={`/sagas/${s.id}`} style={{color:'#9fd3ff'}}>{s.name}</Link></li>
        ))}
      </ul>
    </main>
  )
}
