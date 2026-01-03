import React from 'react';
import { render, screen } from '@testing-library/react';

// Prefer vitest's global mock, but keep compatibility with Jest by falling
// back to a no-op when not available.
const maybeVi: any = (global as any).vi || (global as any).jest || undefined;

// Mock next/link to render a plain <a> so tests can assert on links.
if (maybeVi && maybeVi.mock) {
  maybeVi.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, ...props }: any) => {
      return React.createElement('a', { href, ...props }, children);
    },
  }));
}

// Mock the CSS module import used by the component. Tests don't need real
// classes — just stable strings so className usage doesn't fail.
if (maybeVi && maybeVi.mock) {
  maybeVi.mock('./Header.module.css', () => ({
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
      iconBtn: 'iconBtn',
    },
  }));
}

import Header from './Header';

describe('Header', () => {
  it('renders the site brand and logo link', () => {
    render(<Header />);

    const brandLink = screen.getByRole('link', { name: /DB-DEX/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders main navigation with expected links', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(nav).toBeInTheDocument();

    const expected = ['Characters', 'Sagas', 'Transformations', 'Techniques'];
    expected.forEach((label) => {
      const link = screen.getByRole('link', { name: label });
      expect(link).toBeInTheDocument();
    });
  });

  it('renders control buttons including power level and theme toggle', () => {
    render(<Header />);

    // Power Level button contains the visible text "Power Level".
    const powerText = screen.getByText(/Power Level/i);
    expect(powerText).toBeInTheDocument();

    const powerBtn = powerText.closest('button');
    expect(powerBtn).toBeInTheDocument();
    expect(powerBtn).toHaveAttribute('aria-pressed', 'false');

    const themeToggle = screen.getByRole('button', { name: /Toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });
});
