import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Spinner } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  );
}

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const Small: Story = {
  args: { size: 'sm', color: 'primary' },
};

export const Large: Story = {
  args: { size: 'lg', color: 'primary' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', color: 'primary' },
};

export const AllSizes: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Spinner size="sm" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>sm</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Spinner size="md" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>md</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Spinner size="lg" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>lg</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Spinner size="xl" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>xl</span>
        </div>
      </div>
    </Frame>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Spinner color="primary" size="lg" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>primary</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: '#05244F', padding: '1rem', borderRadius: '0.5rem' }}>
          <Spinner color="white" size="lg" />
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>white</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#7c3aed' }}>
          <Spinner color="current" size="lg" />
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>current</span>
        </div>
      </div>
    </Frame>
  ),
};

export const InsideButton: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: '#FF5B00',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'not-allowed',
            opacity: 0.85,
          }}
          disabled
        >
          <Spinner size="sm" color="white" />
          Saving...
        </button>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: '#05244F',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'not-allowed',
            opacity: 0.85,
          }}
          disabled
        >
          <Spinner size="sm" color="white" />
          Loading...
        </button>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'transparent',
            color: '#FF5B00',
            border: '2px solid #FF5B00',
            borderRadius: '0.375rem',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'not-allowed',
            opacity: 0.85,
          }}
          disabled
        >
          <Spinner size="sm" color="current" />
          Processing...
        </button>
      </div>
    </Frame>
  ),
};

export const CustomLabel: Story = {
  args: {
    size: 'md',
    color: 'primary',
    label: 'Processando dados...',
  },
};
