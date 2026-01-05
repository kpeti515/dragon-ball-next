import type { Character } from './fetchCharacters'

export async function fetchCharacter(id: string): Promise<Character | null> {
  const url = `https://dragonball-api.com/api/characters/${id}`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = (await res.json()) as Character
  return data
}