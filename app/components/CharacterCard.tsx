import Image from 'next/image';
import Link from 'next/link';
import styles from './CharacterCard.module.css';
import type { FC } from 'react';
import { Character } from '../lib/db-api-calls/fetchCharacters';

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  return (
    <div className={styles.card}>
      <Link href={`/characters/${character.id}`} className={styles.cardLink}>
        <div className={styles.cardImageWrap}>
          {character.image ? (
            <Image
              src={character.image}
              alt={character.name}
              width={180}
              height={180}
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          ) : (
            <div className={styles.cardPlaceholder}>No image</div>
          )}
          <div className={styles.powerBanner}>{character.maxKi ?? character.ki ?? 'N/A'}</div>
        </div>
      </Link>

      <h3 className={styles.cardTitle}>{character.name}</h3>
      { character.race && <div className={styles.tag}>Race: {character.race }</div>}
      { character.affiliation && <div className={styles.tag}>Affiliation: {character.affiliation}</div> }
      { character.ki && <div className={styles.tag}>BaseKi: {character.ki}</div> }
      { character.maxKi && <div className={styles.tag}>MaxKi: {character.maxKi}</div> }
      { character.gender && <div className={styles.tag}>Gender: {character.gender}</div> }
    </div>
  );
};

export default CharacterCard;
