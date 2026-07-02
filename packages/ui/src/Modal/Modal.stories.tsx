import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Modal } from './index';

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

const meta: Meta<typeof Modal> = {
  title: 'Layout/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title-default">
          <Modal.Header onClose={() => setOpen(false)}>
            <span id="modal-title-default">Confirm Action</span>
          </Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              Are you sure you want to proceed? This action cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer align="right">
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button style={triggerStyle} onClick={() => setOpen(false)}>
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
      </Frame>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Small Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm" aria-labelledby="modal-title-sm">
          <Modal.Header onClose={() => setOpen(false)}>
            <span id="modal-title-sm">Delete Item</span>
          </Modal.Header>
          <Modal.Body>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              This item will be permanently deleted.
            </p>
          </Modal.Body>
          <Modal.Footer align="right">
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              style={{ ...triggerStyle, background: '#c0392b' }}
              onClick={() => setOpen(false)}
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>
      </Frame>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Large Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg" aria-labelledby="modal-title-lg">
          <Modal.Header onClose={() => setOpen(false)}>
            <span id="modal-title-lg">Project Details</span>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {['Name', 'Client', 'Status', 'Budget', 'Start Date', 'End Date'].map((field) => (
                <div key={field}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    {field}
                  </label>
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: '1px solid rgba(5,36,79,0.15)',
                      borderRadius: '0.375rem',
                      fontSize: '1rem',
                      color: '#05244F',
                    }}
                  >
                    &mdash;
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer align="between">
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Close
            </button>
            <button style={triggerStyle} onClick={() => setOpen(false)}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </Frame>
    );
  },
};

export const ScrollableBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Frame>
        <button style={triggerStyle} onClick={() => setOpen(true)}>
          Open Scrollable Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} size="md" aria-labelledby="modal-title-scroll">
          <Modal.Header onClose={() => setOpen(false)}>
            <span id="modal-title-scroll">Terms of Service</span>
          </Modal.Header>
          <Modal.Body scrollable>
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i} style={{ marginBottom: '1rem', lineHeight: 1.7 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer align="right">
            <button style={secondaryStyle} onClick={() => setOpen(false)}>
              Decline
            </button>
            <button style={triggerStyle} onClick={() => setOpen(false)}>
              Accept
            </button>
          </Modal.Footer>
        </Modal>
      </Frame>
    );
  },
};
