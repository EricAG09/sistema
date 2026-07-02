import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Typography } from './index';

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

const meta: Meta<typeof Typography> = {
  title: 'Basics/Typography',
  component: Typography,
  tags: ['autodocs'],
  decorators: [(Story) => <Frame><Story /></Frame>],
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Body: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="h1">Heading 1 — H1</Typography>
        <Typography variant="h2">Heading 2 — H2</Typography>
        <Typography variant="h3">Heading 3 — H3</Typography>
        <Typography variant="h4">Heading 4 — H4</Typography>
        <Typography variant="h5">Heading 5 — H5</Typography>
        <Typography variant="h6">Heading 6 — H6</Typography>
        <Typography variant="body">Body — The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="body-sm">Body Small — The quick brown fox jumps over the lazy dog.</Typography>
        <Typography variant="caption">Caption — Supporting text, timestamps, meta info.</Typography>
        <Typography variant="label">Label — Form field label</Typography>
        <Typography variant="overline">Overline — Section header</Typography>
        <Typography variant="code">const greeting = &apos;Hello, world!&apos;;</Typography>
      </div>
    </Frame>
  ),
};

export const Colors: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Typography color="default">Default color</Typography>
        <Typography color="muted">Muted color</Typography>
        <Typography color="primary">Primary color</Typography>
        <Typography color="error">Error color</Typography>
        <Typography color="success">Success color</Typography>
        <Typography color="warning">Warning color</Typography>
      </div>
    </Frame>
  ),
};

export const Truncate: Story = {
  render: () => (
    <Frame>
      <div style={{ width: '200px', border: '1px solid rgba(5,36,79,0.12)', padding: '0.5rem', borderRadius: '0.5rem' }}>
        <Typography truncate>
          This is a very long text that should be truncated when it overflows its container.
        </Typography>
      </div>
    </Frame>
  ),
};

export const Weights: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Typography weight="regular">Regular weight — 400</Typography>
        <Typography weight="medium">Medium weight — 500</Typography>
        <Typography weight="semibold">Semibold weight — 600</Typography>
        <Typography weight="bold">Bold weight — 700</Typography>
      </div>
    </Frame>
  ),
};
