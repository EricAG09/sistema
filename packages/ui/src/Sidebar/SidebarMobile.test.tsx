import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { SidebarItem } from './SidebarItem';

// Force matchMedia to report "mobile".
beforeAll(() => {
  window.matchMedia = (query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false
    }) as unknown as MediaQueryList;
});

describe('Sidebar mobile behavior', () => {
  it('closes the overlay on Escape (uncontrolled)', async () => {
    const user = userEvent.setup();
    render(
      <Sidebar aria-label="Nav" defaultOpen>
        <SidebarItem label="Home" href="/" />
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar-overlay')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByTestId('sidebar-overlay')).not.toBeInTheDocument();
  });
});
