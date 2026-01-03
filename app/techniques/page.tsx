import Link from 'next/link'

const dummy = [
  { id: 'kamehameha', name: 'Kamehameha' },
  { id: 'final-flash', name: 'Final Flash' },
]

export default function TechniquesPage() {
  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Techniques</h1>
      <ul style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {dummy.map(t => (
          <li key={t.id}><Link href={`/techniques/${t.id}`} style={{color:'#9fd3ff'}}>{t.name}</Link></li>
        ))}
      </ul>
    </main>
  )
}
