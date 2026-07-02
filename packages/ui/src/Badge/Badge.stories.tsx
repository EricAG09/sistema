import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Badge } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Badge> = {
  title: 'Basics/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [(Story) => <Frame><Story /></Frame>],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </Frame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Badge variant="primary" size="sm">Small</Badge>
        <Badge variant="primary" size="md">Medium</Badge>
      </div>
    </Frame>
  ),
};

export const DotVariants: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Badge dot variant="default" />
        <Badge dot variant="primary" />
        <Badge dot variant="success" />
        <Badge dot variant="warning" />
        <Badge dot variant="error" />
        <Badge dot variant="info" />
      </div>
    </Frame>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#05244F' }}>
          <span>Status</span>
          <Badge dot variant="success" />
          <Badge variant="success" size="sm">Active</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#05244F' }}>
          <span>Notifications</span>
          <Badge variant="error">12</Badge>
        </div>
      </div>
    </Frame>
  ),
};
