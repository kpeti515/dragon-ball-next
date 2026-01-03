import Image from 'next/image'
import styles from '../../page.module.css'

async function fetchCharacter(id: string) {
  const url = `https://dragonball-api.com/api/characters/${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch character')
  return res.json()
}

export default async function CharacterPage({ params }: PageProps<'/characters/[id]'>)  {
  const {id} = await params
  let character: any = null
  try {
    character = await fetchCharacter(id)
  } catch (err) {
    console.error(err)
  }

  if (!character) return <main style={{padding:24,color:'#fff'}}>Character not found</main>

  return (
    <main style={{padding:24}}>
      <h1 style={{color:'#fff'}}>{character.name}</h1>
      <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
        {character.image && (
          <Image src={character.image} alt={character.name} width={320} height={320} style={{objectFit:'contain'}} />
        )}
        <div style={{color:'#cfe7ff'}}>
          <p><strong>Race:</strong> {character.race}</p>
          <p><strong>Affiliation:</strong> {character.affiliation}</p>
          <p><strong>Ki:</strong> {character.ki}</p>
          <p>{character.description}</p>
        </div>
      </div>
    </main>
  )
}
