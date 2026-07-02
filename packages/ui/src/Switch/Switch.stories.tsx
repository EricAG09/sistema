import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Switch } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable feature',
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Dark mode',
    helperText: 'Switch between light and dark theme.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Locked on',
    disabled: true,
    defaultChecked: true,
  },
};

export const SizeSmall: Story = {
  args: {
    label: 'Small switch',
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium switch (default)',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large switch',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <Switch label="Small" size="sm" />
      <Switch label="Medium" size="md" />
      <Switch label="Large" size="lg" />
    </>
  ),
};
