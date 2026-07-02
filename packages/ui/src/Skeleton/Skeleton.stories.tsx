import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Skeleton } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  );
}

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
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
type Story = StoryObj<typeof Skeleton>;

export const TextSingleLine: Story = {
  args: {
    variant: 'text',
    width: '80%',
  },
};

export const TextMultiLine: Story = {
  args: {
    variant: 'text',
    lines: 4,
  },
};

export const CircleAvatar: Story = {
  args: {
    variant: 'circle',
    width: 48,
    height: 48,
  },
};

export const RectCard: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: 160,
  },
};

export const WaveAnimation: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '20rem' }}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" width="75%" />
        <Skeleton variant="text" animation="wave" width="50%" />
      </div>
    </Frame>
  ),
};

export const NoAnimation: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '20rem' }}>
        <Skeleton variant="text" animation="none" />
        <Skeleton variant="text" animation="none" width="65%" />
      </div>
    </Frame>
  ),
};

export const LoadingCardDemo: Story = {
  render: () => (
    <Frame>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          padding: '1.25rem',
          border: '1px solid rgba(5,36,79,0.12)',
          borderRadius: '0.5rem',
          maxWidth: '28rem',
          background: '#fff',
        }}
      >
        {/* Avatar placeholder */}
        <Skeleton variant="circle" width={48} height={48} animation="wave" />

        {/* Content placeholder */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Skeleton variant="text" animation="wave" width="60%" />
          <Skeleton variant="text" animation="wave" width="40%" />
          <div style={{ marginTop: '0.5rem' }}>
            <Skeleton variant="text" animation="wave" />
            <div style={{ marginTop: '0.5rem' }}>
              <Skeleton variant="text" animation="wave" width="85%" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  ),
};

export const LoadingFeedDemo: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '28rem' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid rgba(5,36,79,0.12)',
              borderRadius: '0.5rem',
              background: '#fff',
            }}
          >
            <Skeleton variant="circle" width={40} height={40} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" lines={2} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  ),
};

export const ImagePlaceholder: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '16rem' }}>
        <Skeleton variant="rect" height={180} animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" width="70%" />
        <Skeleton variant="text" animation="wave" width="50%" />
      </div>
    </Frame>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Frame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section>
          <p style={{ fontWeight: 600, color: '#05244F', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Text — single line</p>
          <Skeleton variant="text" width="60%" />
        </section>

        <section>
          <p style={{ fontWeight: 600, color: '#05244F', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Text — multi-line (5 lines)</p>
          <Skeleton variant="text" lines={5} />
        </section>

        <section>
          <p style={{ fontWeight: 600, color: '#05244F', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Circle (avatar)</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="circle" width={48} height={48} />
            <Skeleton variant="circle" width={64} height={64} />
          </div>
        </section>

        <section>
          <p style={{ fontWeight: 600, color: '#05244F', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Rect (card / image)</p>
          <Skeleton variant="rect" height={120} width={280} />
        </section>

        <section>
          <p style={{ fontWeight: 600, color: '#05244F', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Wave animation</p>
          <Skeleton variant="text" lines={3} animation="wave" />
        </section>
      </div>
    </Frame>
  ),
};
