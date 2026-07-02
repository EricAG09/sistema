import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Input } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '480px',
      }}
    >
      {children}
    </div>
  );
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Must be 3–20 characters, letters and numbers only.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled field',
    placeholder: 'Cannot edit this',
    disabled: true,
    defaultValue: 'Locked value',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    leftIcon: <SearchIcon />,
    rightIcon: <EyeIcon />,
  },
};

export const Required: Story = {
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
    required: true,
    helperText: 'This field is required.',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width input',
    placeholder: 'Spans the full container width',
    fullWidth: true,
  },
};
