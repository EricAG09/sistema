import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';

describe('SidebarGroup', () => {
  it('shows its label when expanded', () => {
    render(
      <Sidebar aria-label="Nav">
        <SidebarGroup label="Management">
          <SidebarItem label="Clients" href="/clients" />
        </SidebarGroup>
      </Sidebar>
    );
    expect(screen.getByText('Management')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Clients' })).toBeInTheDocument();
  });

  it('hides the label text when collapsed', () => {
    render(
      <Sidebar aria-label="Nav" defaultCollapsed>
        <SidebarGroup label="Management">
          <SidebarItem label="Clients" href="/clients" />
        </SidebarGroup>
      </Sidebar>
    );
    expect(screen.queryByText('Management')).not.toBeInTheDocument();
  });
});
