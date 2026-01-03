import Image from 'next/image';
import Link from 'next/link';
import styles from './CharacterCard.module.css';
import type { FC } from 'react';

type Character = {
  id: string | number;
  name: string;
  image?: string | null;
  race?: string | null;
  affiliation?: string | null;
  ki?: string | number | null;
};

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
          <div className={styles.powerBanner}>{character.ki ?? 'N/A'}</div>
        </div>
      </Link>

      <h3 className={styles.cardTitle}>{character.name}</h3>
      <div className={styles.subtitle}>{character.race ?? character.affiliation ?? ''}</div>
      { (character.race || character.affiliation) && (
        <div style={{marginTop:10}}>
          <div className={styles.tag}>{character.race ?? character.affiliation}</div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
