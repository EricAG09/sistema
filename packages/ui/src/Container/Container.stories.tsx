import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Container } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '1.5rem',
        fontFamily: 'system-ui, sans-serif',
        background: '#f0f4f8',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}

function Box({ label, maxWidth }: { label: string; maxWidth: string }) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '2px solid #FF5B00',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem',
        color: '#05244f',
      }}
    >
      <strong style={{ fontSize: '0.875rem', color: '#FF5B00' }}>{label}</strong>
      <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
        max-width: {maxWidth}
      </span>
    </div>
  );
}

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Frame>
      <Container>
        <Box label="lg (default)" maxWidth="64rem" />
      </Container>
    </Frame>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <Frame>
      <Container maxWidth="sm">
        <Box label="sm" maxWidth="40rem" />
      </Container>
      <Container maxWidth="md">
        <Box label="md" maxWidth="48rem" />
      </Container>
      <Container maxWidth="lg">
        <Box label="lg" maxWidth="64rem" />
      </Container>
      <Container maxWidth="xl">
        <Box label="xl" maxWidth="80rem" />
      </Container>
      <Container maxWidth="2xl">
        <Box label="2xl" maxWidth="96rem" />
      </Container>
      <Container maxWidth="full">
        <Box label="full" maxWidth="100%" />
      </Container>
    </Frame>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Frame>
      <Container maxWidth="md" padding={false}>
        <Box label="md sem padding horizontal" maxWidth="48rem" />
      </Container>
    </Frame>
  ),
};

export const NotCentered: Story = {
  render: () => (
    <Frame>
      <Container maxWidth="sm" center={false}>
        <Box label="sm alinhado à esquerda" maxWidth="40rem" />
      </Container>
    </Frame>
  ),
};

export const AsSection: Story = {
  render: () => (
    <Frame>
      <Container as="section" maxWidth="lg">
        <Box label="section (semântico)" maxWidth="64rem" />
      </Container>
    </Frame>
  ),
};
