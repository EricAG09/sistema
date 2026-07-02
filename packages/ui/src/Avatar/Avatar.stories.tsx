import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Avatar } from './index';

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

const meta: Meta<typeof Avatar> = {
  title: 'Basics/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [(Story) => <Frame><Story /></Frame>],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: {
    name: 'Eric Galvao',
    size: 'md',
    shape: 'circle',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    name: 'Eric Galvao',
    size: 'md',
    shape: 'circle',
  },
};

export const Sizes: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar name="AX" size="xs" />
        <Avatar name="Eric Galvao" size="sm" />
        <Avatar name="Eric Galvao" size="md" />
        <Avatar name="Eric Galvao" size="lg" />
        <Avatar name="Eric Galvao" size="xl" />
      </div>
    </Frame>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar name="Eric Galvao" shape="circle" size="lg" />
        <Avatar name="Eric Galvao" shape="square" size="lg" />
      </div>
    </Frame>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Avatar name="Online User" status="online" size="md" />
        <Avatar name="Offline User" status="offline" size="md" />
        <Avatar name="Away User" status="away" size="md" />
        <Avatar name="Busy User" status="busy" size="md" />
      </div>
    </Frame>
  ),
};

export const FallbackOnError: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.example.com/avatar.jpg',
    name: 'Eric Galvao',
    size: 'md',
    shape: 'circle',
  },
};
