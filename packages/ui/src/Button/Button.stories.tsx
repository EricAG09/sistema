import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Button } from './index';

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

const meta: Meta<typeof Button> = {
  title: 'Basics/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [(Story) => <Frame><Story /></Frame>],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Button',
    variant: 'danger',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </Frame>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
};

export const WithIcons: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<span>←</span>}>Left Icon</Button>
        <Button rightIcon={<span>→</span>}>Right Icon</Button>
        <Button leftIcon={<span>←</span>} rightIcon={<span>→</span>}>Both Icons</Button>
      </div>
    </Frame>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Frame>
      <div style={{ width: '300px' }}>
        <Button fullWidth>Full Width Button</Button>
      </div>
    </Frame>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </Frame>
  ),
};
