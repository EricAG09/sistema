import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Divider } from './index';

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

const meta: Meta<typeof Divider> = {
  title: 'Basics/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [(Story) => <Frame><Story /></Frame>],
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    label: 'or',
  },
};

export const Vertical: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', height: '80px', alignItems: 'stretch', gap: '1rem' }}>
        <span>Left content</span>
        <Divider orientation="vertical" />
        <span>Right content</span>
      </div>
    </Frame>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Frame>
      <div>
        <p style={{ margin: 0, color: '#05244F' }}>Section A</p>
        <Divider spacing="md" />
        <p style={{ margin: 0, color: '#05244F' }}>Section B</p>
        <Divider spacing="lg" label="end" />
        <p style={{ margin: 0, color: '#05244F' }}>Section C</p>
      </div>
    </Frame>
  ),
};

export const CustomColor: Story = {
  args: {
    orientation: 'horizontal',
    color: '#FF5B00',
    label: 'custom',
  },
};
