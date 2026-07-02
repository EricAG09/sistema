import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Textarea } from './index';

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

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Describe your project...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    error: 'Bio must be at least 10 characters.',
    defaultValue: 'Too short',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Leave a comment...',
    helperText: 'Max 500 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Notes',
    defaultValue: 'This content is locked.',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Your feedback is required...',
    required: true,
    helperText: 'This field is required.',
  },
};

export const NoResize: Story = {
  args: {
    label: 'Fixed size',
    placeholder: 'Cannot resize this textarea.',
    resize: 'none',
    rows: 3,
  },
};

export const LargeRows: Story = {
  args: {
    label: 'Long form content',
    placeholder: 'Plenty of space to write...',
    rows: 8,
    fullWidth: true,
  },
};
