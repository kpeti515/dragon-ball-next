import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

// Mock next/link to render a simple anchor
vi.mock('next/link', () => {
  return {
    default: ({ children, href, className }: any) => {
      return (
        React.createElement('a', { href, className }, children)
      )
    }
  }
})

// Mock CSS module import used by Header
vi.mock('./Header.module.css', () => {
  return {
    default: {
      header: 'header',
      inner: 'inner',
      logo: 'logo',
      logoBadge: 'logoBadge',
      nav: 'nav',
      navList: 'navList',
      navLink: 'navLink',
      brand: 'brand',
      controls: 'controls',
      powerBtn: 'powerBtn',
      cameraIcon: 'cameraIcon',
      powerText: 'powerText',
      toggle: 'toggle',
      toggleKnob: 'toggleKnob',
      iconBtn: 'iconBtn'
    }
  }
})


describe('Header', () => {
  it('renders brand and navigation links and controls', () => {
    render(<Header />)

    // Brand link
    const brand = screen.getByText('DB-DEX') as HTMLElement | null
    expect(brand).toBeTruthy()
    expect(brand?.getAttribute('href')).toBe('/')

    // Navigation links
    const characters = screen.getByText('Characters') as HTMLElement
    const sagas = screen.getByText('Sagas') as HTMLElement
    const transformations = screen.getByText('Transformations') as HTMLElement
    const techniques = screen.getByText('Techniques') as HTMLElement

    expect(characters.getAttribute('href')).toBe('/characters')
    expect(sagas.getAttribute('href')).toBe('/sagas')
    expect(transformations.getAttribute('href')).toBe('/transformations')
    expect(techniques.getAttribute('href')).toBe('/techniques')

    // Controls
    const themeBtn = screen.getByRole('button', { name: /Toggle theme/i })
    expect(themeBtn).toBeTruthy()

    const powerText = screen.getByText('Power Level')
    expect(powerText).toBeTruthy()
  })
})

