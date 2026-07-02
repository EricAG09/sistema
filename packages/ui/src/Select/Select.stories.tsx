import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Select } from './index';

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

const countryOptions = [
  { value: 'br', label: 'Brazil' },
  { value: 'us', label: 'United States' },
  { value: 'pt', label: 'Portugal' },
  { value: 'es', label: 'Spain' },
  { value: 'fr', label: 'France' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
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
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Priority',
    options: priorityOptions,
    error: 'Please select a valid priority.',
    placeholder: 'Select priority...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    helperText: 'This determines your billing currency.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Region',
    options: countryOptions,
    disabled: true,
    defaultValue: 'br',
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    required: true,
    helperText: 'This field is required.',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Priority level',
    options: priorityOptions,
    placeholder: 'Select priority...',
    helperText: 'Critical is currently unavailable.',
  },
};
