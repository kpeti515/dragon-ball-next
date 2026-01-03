import Link from 'next/link'

export default async function TransformationsPage() {
  let list: any[] = []
  try {
    const res = await fetch('https://dragonball-api.com/api/transformations?limit=100')
    if (res.ok) list = await res.json()
  } catch (e) {
    console.error(e)
  }

  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>Transformations</h1>
      <ul style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {(list || []).map((t: any) => (
          <li key={t.id}><Link href={`/transformations/${t.id}`} style={{color:'#9fd3ff'}}>{t.name ?? t.id}</Link></li>
        ))}
      </ul>
    </main>
  )
}
