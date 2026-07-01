import { describe, it, expect, vi } from 'vitest';
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

  it('in controlled mode calls onOpenChange without self-toggling', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sidebar aria-label="Nav">
        <SidebarSubmenu label="Clients" open={false} onOpenChange={onOpenChange}>
          <SidebarItem label="List" href="/clients" />
        </SidebarSubmenu>
      </Sidebar>
    );
    // controlled closed: child not shown
    expect(screen.queryByRole('link', { name: 'List' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Clients/ }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // still closed because parent didn't update the prop
    expect(screen.queryByRole('link', { name: 'List' })).not.toBeInTheDocument();
  });
});
