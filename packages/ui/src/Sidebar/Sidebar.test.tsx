import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('Sidebar container', () => {
  it('renders a nav with the given aria-label', () => {
    render(<Sidebar aria-label="Main navigation">content</Sidebar>);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveTextContent('content');
  });

  it('applies collapsed data attribute when defaultCollapsed is true', () => {
    render(<Sidebar aria-label="Nav" defaultCollapsed>x</Sidebar>);
    expect(screen.getByRole('navigation')).toHaveAttribute('data-collapsed', 'true');
  });

  it('defaults to the dark variant', () => {
    render(<Sidebar aria-label="Nav">x</Sidebar>);
    expect(screen.getByRole('navigation')).toHaveAttribute('data-variant', 'dark');
  });

  it('reports not-mobile by default via data-mobile', () => {
    render(<Sidebar aria-label="Nav">x</Sidebar>);
    expect(screen.getByRole('navigation')).toHaveAttribute('data-mobile', 'false');
  });
});
