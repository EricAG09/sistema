import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './index';

describe('Sidebar namespaced API', () => {
  it('exposes subcomponents as static members', () => {
    expect(Sidebar.Item).toBeTypeOf('function');
    expect(Sidebar.Group).toBeTypeOf('function');
    expect(Sidebar.Submenu).toBeTypeOf('function');
    expect(Sidebar.Header).toBeTypeOf('function');
    expect(Sidebar.Footer).toBeTypeOf('function');
  });

  it('renders a full composition', () => {
    render(
      <Sidebar aria-label="Main">
        <Sidebar.Header>Brand</Sidebar.Header>
        <Sidebar.Group label="Section">
          <Sidebar.Item label="Home" href="/" active />
        </Sidebar.Group>
        <Sidebar.Footer>Footer</Sidebar.Footer>
      </Sidebar>
    );
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
