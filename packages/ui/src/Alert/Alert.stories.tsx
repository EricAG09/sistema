import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Alert } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), padding: '2rem', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {children}
    </div>
  );
}

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
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
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational alert.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your input before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Something went wrong. Please try again.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    children: 'This alert includes a title above the body text.',
  },
};

export const AllVariantsWithTitles: Story = {
  render: () => (
    <Frame>
      <Alert variant="success" title="Success">
        Your account has been created successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to connect to the server. Check your connection.
      </Alert>
      <Alert variant="info" title="Info">
        A new version of the app is available. Refresh to update.
      </Alert>
    </Frame>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <Frame>
        {visible ? (
          <Alert
            variant="info"
            title="Dismissible Alert"
            dismissible
            onDismiss={() => setVisible(false)}
          >
            Click the X button to dismiss this alert.
          </Alert>
        ) : (
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Alert dismissed. Refresh to see it again.</p>
        )}
      </Frame>
    );
  },
};

export const DismissibleVariants: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
    const dismiss = (key: string) => setDismissed((prev) => ({ ...prev, [key]: true }));
    return (
      <Frame>
        {!dismissed['success'] && (
          <Alert variant="success" title="Success" dismissible onDismiss={() => dismiss('success')}>
            Operation completed successfully.
          </Alert>
        )}
        {!dismissed['warning'] && (
          <Alert variant="warning" title="Warning" dismissible onDismiss={() => dismiss('warning')}>
            Disk space is running low.
          </Alert>
        )}
        {!dismissed['error'] && (
          <Alert variant="error" title="Error" dismissible onDismiss={() => dismiss('error')}>
            Unable to process your request.
          </Alert>
        )}
        {!dismissed['info'] && (
          <Alert variant="info" title="Info" dismissible onDismiss={() => dismiss('info')}>
            System maintenance scheduled for tonight.
          </Alert>
        )}
      </Frame>
    );
  },
};

export const CustomIcon: Story = {
  render: () => (
    <Frame>
      <Alert
        variant="info"
        title="Custom Icon"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        }
      >
        This alert uses a custom icon passed as a prop.
      </Alert>
    </Frame>
  ),
};
