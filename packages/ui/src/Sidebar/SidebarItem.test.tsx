import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { SidebarItem } from './SidebarItem';

function wrap(ui: React.ReactNode, props = {}) {
  return render(<Sidebar aria-label="Nav" {...props}>{ui}</Sidebar>);
}

describe('SidebarItem', () => {
  it('renders a link when href is provided', () => {
    wrap(<SidebarItem label="Home" href="/home" />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders a button when there is no href', () => {
    wrap(<SidebarItem label="Action" />);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current=page', () => {
    wrap(<SidebarItem label="Home" href="/" active />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('exposes the label via title when collapsed', () => {
    wrap(<SidebarItem label="Home" href="/" />, { defaultCollapsed: true });
    expect(screen.getByRole('link')).toHaveAttribute('title', 'Home');
  });

  it('disables the button when disabled', () => {
    wrap(<SidebarItem label="Nope" disabled />);
    expect(screen.getByRole('button', { name: 'Nope' })).toBeDisabled();
  });
});
