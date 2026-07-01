import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { SidebarSubmenu } from './SidebarSubmenu';
import { SidebarItem } from './SidebarItem';

function renderMenu(props = {}) {
  return render(
    <Sidebar aria-label="Nav">
      <SidebarSubmenu label="Clients" {...props}>
        <SidebarItem label="List" href="/clients" />
      </SidebarSubmenu>
    </Sidebar>
  );
}

describe('SidebarSubmenu', () => {
  it('is collapsed by default with aria-expanded=false', () => {
    renderMenu();
    expect(screen.getByRole('button', { name: /Clients/ })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.queryByRole('link', { name: 'List' })).not.toBeInTheDocument();
  });

  it('opens on click and shows children', async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole('button', { name: /Clients/ }));
    expect(screen.getByRole('button', { name: /Clients/ })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('link', { name: 'List' })).toBeInTheDocument();
  });

  it('respects defaultOpen', () => {
    renderMenu({ defaultOpen: true });
    expect(screen.getByRole('link', { name: 'List' })).toBeInTheDocument();
  });
});
