import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { ToastProvider, useToast } from './index';
import type { ToastVariant, ToastPosition } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  );
}

const buttonBase: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#fff',
};

function ToastDemo() {
  const { toast } = useToast();

  const variants: { label: string; variant: ToastVariant; title: string; message: string; bg: string }[] = [
    { label: 'Success', variant: 'success', title: 'Saved!', message: 'Your changes have been saved.', bg: '#22c55e' },
    { label: 'Error', variant: 'error', title: 'Error', message: 'Failed to save changes.', bg: '#ef4444' },
    { label: 'Warning', variant: 'warning', title: 'Warning', message: 'This action cannot be undone.', bg: '#f59e0b' },
    { label: 'Info', variant: 'info', title: 'Info', message: 'A new update is available.', bg: '#3b82f6' },
  ];

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      {variants.map(({ label, variant, title, message, bg }) => (
        <button
          key={variant}
          style={{ ...buttonBase, background: bg }}
          onClick={() => toast({ variant, title, message })}
        >
          Show {label}
        </button>
      ))}
    </div>
  );
}

function ToastDemoNoTitle() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <button
        style={{ ...buttonBase, background: '#22c55e' }}
        onClick={() => toast({ variant: 'success', message: 'File uploaded successfully.' })}
      >
        Success (no title)
      </button>
      <button
        style={{ ...buttonBase, background: '#ef4444' }}
        onClick={() => toast({ variant: 'error', message: 'Connection timed out.', duration: 8000 })}
      >
        Error (8s)
      </button>
      <button
        style={{ ...buttonBase, background: '#6b7280' }}
        onClick={() => toast({ variant: 'info', message: 'Toast with no auto-dismiss.', duration: 0 })}
      >
        Persistent
      </button>
    </div>
  );
}

const meta: Meta = {
  title: 'Feedback/Toast',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const TopRight: Story = {
  render: () => (
    <Frame>
      <ToastProvider position="top-right">
        <div>
          <p style={{ marginBottom: '1rem', color: '#05244F', fontWeight: 600 }}>Position: top-right (default)</p>
          <ToastDemo />
        </div>
      </ToastProvider>
    </Frame>
  ),
};

export const TopLeft: Story = {
  render: () => (
    <Frame>
      <ToastProvider position="top-left">
        <div>
          <p style={{ marginBottom: '1rem', color: '#05244F', fontWeight: 600 }}>Position: top-left</p>
          <ToastDemo />
        </div>
      </ToastProvider>
    </Frame>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <Frame>
      <ToastProvider position="bottom-right">
        <div>
          <p style={{ marginBottom: '1rem', color: '#05244F', fontWeight: 600 }}>Position: bottom-right</p>
          <ToastDemo />
        </div>
      </ToastProvider>
    </Frame>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <Frame>
      <ToastProvider position="top-center">
        <div>
          <p style={{ marginBottom: '1rem', color: '#05244F', fontWeight: 600 }}>Position: top-center</p>
          <ToastDemo />
        </div>
      </ToastProvider>
    </Frame>
  ),
};

export const NoTitleAndPersistent: Story = {
  render: () => (
    <Frame>
      <ToastProvider position="top-right">
        <div>
          <p style={{ marginBottom: '1rem', color: '#05244F', fontWeight: 600 }}>Without titles / custom durations</p>
          <ToastDemoNoTitle />
        </div>
      </ToastProvider>
    </Frame>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const positions: ToastPosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'];
    return (
      <Frame>
        <div>
          <p style={{ color: '#05244F', fontWeight: 600, marginBottom: '1rem' }}>
            All positions — each button launches a provider with that position
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {positions.map((pos) => (
              <ToastProvider key={pos} position={pos}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ width: '10rem', fontSize: '0.8rem', color: '#6b7280' }}>{pos}</span>
                  <PositionDemo position={pos} />
                </div>
              </ToastProvider>
            ))}
          </div>
        </div>
      </Frame>
    );
  },
};

function PositionDemo({ position }: { position: ToastPosition }) {
  const { toast } = useToast();
  return (
    <button
      style={{ ...buttonBase, background: '#3b82f6' }}
      onClick={() => toast({ variant: 'info', message: `Toast at ${position}` })}
    >
      Trigger
    </button>
  );
}
