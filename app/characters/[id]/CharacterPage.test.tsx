import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import CharacterPage from './page'

// Mock next/image to a simple img element
vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt }: { src?: string; alt?: string }) => {
      return React.createElement('img', { src, alt })
    }
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('CharacterPage', () => {
  it('renders character details when fetch succeeds', async () => {
    const character = {
      name: 'Goku',
      image: '/goku.png',
      race: 'Saiyan',
      affiliation: 'Z Fighters',
      ki: 9001,
      description: 'A powerful martial artist.'
    }

    // mock global fetch
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => character
    }))

    // call the async component and render its result
    const CharacterPageComponent = CharacterPage as unknown as (props: { params: { id: string } }) => Promise<React.ReactElement>
    const element = await CharacterPageComponent({ params: { id: '1' } })
    render(element)

    expect(screen.getByRole('heading', { name: /Goku/i })).toBeInTheDocument()
    expect(screen.getByText(/Saiyan/i)).toBeInTheDocument()
    expect(screen.getByText(/Z Fighters/i)).toBeInTheDocument()
    expect(screen.getByText(/9001/)).toBeInTheDocument()
    expect(screen.getByText(/A powerful martial artist/i)).toBeInTheDocument()

    const img = screen.getByRole('img', { name: /Goku/i }) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('/goku.png')
  })

  it('shows not found when fetch fails', async () => {
    // fetch returns non-ok
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    const CharacterPageComponent = CharacterPage as unknown as (props: { params: { id: string } }) => Promise<React.ReactElement>
    const element = await CharacterPageComponent({ params: { id: 'missing' } })
    render(element)

    expect(screen.getByText('Character not found')).toBeInTheDocument()
  })
})
