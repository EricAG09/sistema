import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Drawer } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '400px',
      }}
    >
      {children}
    </div>
  );
}

const triggerStyle: React.CSSProperties = {
  background: '#FF5B00',
  color: '#fff',
  border: 'none',
  borderRadius: '0.5rem',
  padding: '0.625rem 1.25rem',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 600,
};

const secondaryStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(5,36,79,0.2)',
  borderRadius: '0.5rem',
  padding: '0.625rem 1.25rem',
  cursor: 'pointer',
  fontSize: '1rem',
  color: '#05244F',
};

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Right Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="right" aria-label="Detail panel">
          <Drawer.Header onClose={() => setOpen(false)}>Client Details</Drawer.Header>
          <Drawer.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Name', 'Email', 'Phone', 'Company', 'Status'].map((field) => (
                <div key={field}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#6b7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {field}
                  </label>
                  <p style={{ margin: 0, color: '#05244F' }}>&mdash;</p>
                </div>
              ))}
            </div>
          </Drawer.Body>
          <Drawer.Footer align="right">
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button style={triggerStyle} onClick={() => setOpen(false)}>
              Save
            </button>
          </Drawer.Footer>
        </Drawer>
      </Frame>
    );
  },
};

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Left Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left" aria-label="Navigation panel">
          <Drawer.Header onClose={() => setOpen(false)}>Navigation</Drawer.Header>
          <Drawer.Body>
            <nav>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {['Dashboard', 'Clients', 'Projects', 'Reports', 'Settings'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        display: 'block',
                        padding: '0.625rem 0.75rem',
                        borderRadius: '0.375rem',
                        color: '#05244F',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Drawer.Body>
        </Drawer>
      </Frame>
    );
  },
};

export const SmallDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Small Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} size="sm" aria-label="Quick actions">
          <Drawer.Header onClose={() => setOpen(false)}>Quick Actions</Drawer.Header>
          <Drawer.Body>
            <p style={{ margin: '0 0 1rem', color: '#6b7280', fontSize: '0.875rem' }}>
              Choose an action to perform.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Export CSV', 'Export PDF', 'Send Report', 'Archive'].map((action) => (
                <button
                  key={action}
                  style={{
                    ...secondaryStyle,
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </Drawer.Body>
          <Drawer.Footer align="between">
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>4 actions</span>
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Close
            </button>
          </Drawer.Footer>
        </Drawer>
      </Frame>
    );
  },
};
