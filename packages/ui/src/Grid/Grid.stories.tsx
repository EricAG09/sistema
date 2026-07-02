import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Grid } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '1.5rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
}

const COLORS = ['#05244F', '#273A76', '#3C58B4', '#FF5B00', '#6b7280', '#0e3d6e'];

function Cell({ index, label }: { index: number; label?: string }) {
  return (
    <div
      style={{
        background: COLORS[index % COLORS.length],
        color: '#ffffff',
        borderRadius: '0.5rem',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '0.875rem',
      }}
    >
      {label ?? `Item ${index + 1}`}
    </div>
  );
}

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Grid>;

export const TwoColumns: Story = {
  render: () => (
    <Frame>
      <Grid cols={2} gap="md">
        {Array.from({ length: 4 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
    </Frame>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Frame>
      <Grid cols={3} gap="md">
        {Array.from({ length: 6 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
    </Frame>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Frame>
      <Grid cols={4} gap="lg">
        {Array.from({ length: 8 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
    </Frame>
  ),
};

export const WithColSpan: Story = {
  render: () => (
    <Frame>
      <Grid cols={12} gap="md">
        <Grid.Item colSpan={8}>
          <Cell index={0} label="colSpan 8" />
        </Grid.Item>
        <Grid.Item colSpan={4}>
          <Cell index={3} label="colSpan 4" />
        </Grid.Item>
        <Grid.Item colSpan={4}>
          <Cell index={1} label="colSpan 4" />
        </Grid.Item>
        <Grid.Item colSpan={4}>
          <Cell index={2} label="colSpan 4" />
        </Grid.Item>
        <Grid.Item colSpan={4}>
          <Cell index={4} label="colSpan 4" />
        </Grid.Item>
        <Grid.Item colSpan={12}>
          <Cell index={5} label="colSpan 12 (full width)" />
        </Grid.Item>
      </Grid>
    </Frame>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <Frame>
      <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.875rem' }}>gap="none"</p>
      <Grid cols={3} gap="none" style={{ marginBottom: '1.5rem' } as React.CSSProperties}>
        {Array.from({ length: 3 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
      <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.875rem' }}>gap="sm"</p>
      <Grid cols={3} gap="sm" style={{ marginBottom: '1.5rem' } as React.CSSProperties}>
        {Array.from({ length: 3 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
      <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: '0.875rem' }}>gap="lg"</p>
      <Grid cols={3} gap="lg">
        {Array.from({ length: 3 }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </Grid>
    </Frame>
  ),
};
