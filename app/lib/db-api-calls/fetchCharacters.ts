interface Links {
  first: string
  previous: string | null
  next: string | null
  last: string
}

interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

interface Planet {
  id: number
  name: string
  isDestroyed?: boolean
  description?: string
  image?: string
  deletedAt?: string | null
}

interface Transformation {
  id: number
  name?: string
  description?: string
  image?: string
  deletedAt?: string | null
}

export interface Character {
  id: number
  name: string
  ki?: string
  maxKi?: string
  race?: string
  gender?: string
  description?: string
  image?: string
  affiliation?: string
  deletedAt?: string | null
  originPlanet?: Planet
  transformations?: Transformation[]
}

export interface CharactersResult {
  items: Character[]
  meta: Meta
  links: Links
}

export type FetchCharactersOptions = {
  page?: number
  limit?: number
  fetchAll?: boolean
  filters?: Record<string, string | number | boolean>
}

export async function fetchCharacters(opts?: FetchCharactersOptions): Promise<Character[]> {
  const base = 'https://dragonball-api.com/api/characters'

  const buildUrl = (page?: number, limit?: number, filters?: Record<string, string | number | boolean>) => {
    const params = new URLSearchParams()
    if (page !== undefined) params.set('page', String(page))
    if (limit !== undefined) params.set('limit', String(limit))
    if (filters) {
      for (const [k, v] of Object.entries(filters)) {
        params.set(k, String(v))
      }
    }
    const qs = params.toString()
    return qs ? `${base}?${qs}` : base
  }

  if (opts?.fetchAll) {
    const url = buildUrl(undefined, Infinity, opts?.filters)
    const res = await fetch(url)
    if (!res.ok) return []
    const data = (await res.json()) as CharactersResult
    return data.items ?? []
  }

  const url = buildUrl(opts?.page, opts?.limit, opts?.filters)
  const res = await fetch(url)
  if (!res.ok) return []
  const data = (await res.json()) as CharactersResult
  return data.items ?? []
}