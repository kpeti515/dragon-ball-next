import Image from 'next/image'
import { fetchCharacter } from '../../lib/db-api-calls/fetchCharacter'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

export default async function CharacterPage({ params }: PageProps<'/characters/[id]'>)  {
  const { id } = await params
  const character = await fetchCharacter(id)

  if (!character) {
    notFound()
  }

  return (
    <main className={styles.root}>
      <h1>{character.name}</h1>
      <div className={styles.container}>
        {character.image && (
          <Image src={character.image} alt={character.name} width={320} height={320} className={styles.image} />
        )}
        <div className={styles.meta}>
          <p><strong>Race:</strong> {character.race}</p>
          <p><strong>Affiliation:</strong> {character.affiliation}</p>
          <p><strong>Ki:</strong> {character.ki}</p>
          <p>{character.description}</p>
        </div>
      </div>
    </main>
  )
}
