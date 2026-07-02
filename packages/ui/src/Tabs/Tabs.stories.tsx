import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Tabs } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '400px',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Tabs> = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
          <Tabs.Tab value="reports">Reports</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Overview</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            This is the overview panel. It provides a high-level summary of the current project
            status, key metrics, and recent activity.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="analytics">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Analytics</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Detailed analytics and performance metrics are displayed here. Track conversions,
            engagement, and growth trends over time.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="reports">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Reports</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Generate and download reports in various formats. Schedule automated report delivery
            to your team.
          </p>
        </Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="profile" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
          <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Profile Settings</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Update your personal information, profile picture, and public display name.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="security">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Security</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Manage your password, two-factor authentication, and active sessions.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="notifications">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Notifications</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Configure which notifications you receive and how they are delivered.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="billing">
          <h3 style={{ margin: '0 0 0.5rem', color: '#05244F' }}>Billing</h3>
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Review your subscription plan, payment methods, and invoice history.
          </p>
        </Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Frame>
      <Tabs defaultValue="active">
        <Tabs.List>
          <Tabs.Tab value="active">Active</Tabs.Tab>
          <Tabs.Tab value="pending">Pending</Tabs.Tab>
          <Tabs.Tab value="archived" disabled>
            Archived
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="active">
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Active content is displayed here. The &quot;Archived&quot; tab above is disabled and
            cannot be selected.
          </p>
        </Tabs.Panel>
        <Tabs.Panel value="pending">
          <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
            Pending items are shown in this panel.
          </p>
        </Tabs.Panel>
      </Tabs>
    </Frame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [tab, setTab] = useState('tab1');
    return (
      <Frame>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Active tab (controlled): <strong style={{ color: '#FF5B00' }}>{tab}</strong>
          </span>
          <button
            style={{
              background: 'transparent',
              border: '1px solid rgba(5,36,79,0.2)',
              borderRadius: '0.375rem',
              padding: '0.25rem 0.5rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: '#05244F',
            }}
            onClick={() => setTab('tab1')}
          >
            Reset
          </button>
        </div>
        <Tabs value={tab} onChange={setTab}>
          <Tabs.List>
            <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
            <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
              Panel 1 content. This Tabs instance is fully controlled via React useState.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
              Panel 2 content.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="tab3">
            <p style={{ margin: 0, color: '#6b7280', lineHeight: 1.6 }}>
              Panel 3 content.
            </p>
          </Tabs.Panel>
        </Tabs>
      </Frame>
    );
  },
};
