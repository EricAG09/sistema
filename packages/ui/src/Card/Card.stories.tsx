import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Card } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '400px',
        background: '#f8fafc',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  render: () => (
    <Frame>
      <Card style={{ maxWidth: '24rem' } as React.CSSProperties}>
        <Card.Body>
          <p style={{ margin: 0, color: '#05244F' }}>
            A simple card with default shadow and border.
          </p>
        </Card.Body>
      </Card>
    </Frame>
  ),
};

export const WithHeaderBodyFooter: Story = {
  render: () => (
    <Frame>
      <Card style={{ maxWidth: '28rem' } as React.CSSProperties}>
        <Card.Header
          title="Project Overview"
          subtitle="Last updated 2 hours ago"
          actions={
            <button
              style={{
                background: '#FF5B00',
                color: '#fff',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.375rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Edit
            </button>
          }
        />
        <Card.Body>
          <p style={{ margin: 0, color: '#05244F', lineHeight: 1.6 }}>
            This card uses the Header, Body, and Footer compound components to
            create a structured layout with a title, subtitle, and action button.
          </p>
        </Card.Body>
        <Card.Footer align="between">
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>3 members</span>
          <button
            style={{
              background: 'transparent',
              border: '1px solid rgba(5,36,79,0.2)',
              borderRadius: '0.375rem',
              padding: '0.375rem 0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#05244F',
            }}
          >
            View details
          </button>
        </Card.Footer>
      </Card>
    </Frame>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['Alpha', 'Beta', 'Gamma'].map((name) => (
          <Card
            key={name}
            hoverable
            style={{ maxWidth: '14rem', flex: '0 0 14rem' } as React.CSSProperties}
          >
            <Card.Body>
              <strong style={{ color: '#05244F', display: 'block', marginBottom: '0.5rem' }}>
                {name}
              </strong>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Hover to see the lift effect.
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Frame>
  ),
};

export const Shadows: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
          <Card
            key={shadow}
            shadow={shadow}
            style={{ flex: '0 0 10rem' } as React.CSSProperties}
          >
            <Card.Body padding="md">
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', textAlign: 'center' }}>
                shadow=&quot;{shadow}&quot;
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Frame>
  ),
};

export const Paddings: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
          <Card
            key={padding}
            padding={padding}
            style={{ flex: '0 0 10rem' } as React.CSSProperties}
          >
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', textAlign: 'center' }}>
              padding=&quot;{padding}&quot;
            </p>
          </Card>
        ))}
      </div>
    </Frame>
  ),
};
