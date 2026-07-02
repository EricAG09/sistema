import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

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

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
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
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'default-group',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'checked-group',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium plan',
    helperText: 'Includes all features plus priority support.',
    name: 'plan-group',
  },
};

export const WithError: Story = {
  args: {
    label: 'Option with error',
    error: 'This selection is no longer available.',
    name: 'error-group',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable option',
    disabled: true,
    name: 'disabled-group',
  },
};

export const GroupVertical: Story = {
  render: () => (
    <RadioGroup label="Subscription plan" name="plan-v">
      <Radio label="Free — basic features" value="free" />
      <Radio label="Pro — $12/month" value="pro" />
      <Radio label="Enterprise — custom pricing" value="enterprise" />
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup label="Size" name="size-h" orientation="horizontal">
      <Radio label="S" value="s" />
      <Radio label="M" value="m" defaultChecked />
      <Radio label="L" value="l" />
      <Radio label="XL" value="xl" />
    </RadioGroup>
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <RadioGroup label="Payment method" name="payment" error="Please select a payment method.">
      <Radio label="Credit card" value="card" />
      <Radio label="Bank transfer" value="bank" />
      <Radio label="Crypto" value="crypto" disabled />
    </RadioGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup label="Region (locked)" name="region" disabled>
      <Radio label="North America" value="na" defaultChecked />
      <Radio label="Europe" value="eu" />
      <Radio label="Asia Pacific" value="apac" />
    </RadioGroup>
  ),
};
