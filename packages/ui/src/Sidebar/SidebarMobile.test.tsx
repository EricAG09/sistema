import { describe, it, expect, beforeAll, vi } from 'vitest';
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

  it('controlled mode: Escape calls onOpenChange without self-closing', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Sidebar aria-label="Nav" open onOpenChange={onOpenChange}>
        <SidebarItem label="Home" href="/" />
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar-overlay')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // still open because parent didn't change the prop
    expect(screen.getByTestId('sidebar-overlay')).toBeInTheDocument();
  });
});
