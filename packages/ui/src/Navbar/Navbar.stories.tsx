import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Navbar } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  );
}

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Frame>
      <Navbar aria-label="Main navigation">
        <Navbar.Brand href="/">
          <strong style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>PWR</strong>
        </Navbar.Brand>
        <Navbar.Items>
          <Navbar.Item label="Início" href="/" active />
          <Navbar.Item label="Clientes" href="/clientes" />
          <Navbar.Item label="Projetos" href="/projetos" />
          <Navbar.Item label="Relatórios" href="/relatorios" />
        </Navbar.Items>
        <Navbar.Actions>
          <button
            type="button"
            style={{
              padding: '0.4rem 1rem',
              background: '#FF5B00',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Novo
          </button>
        </Navbar.Actions>
      </Navbar>
      <div style={{ padding: '2rem', color: '#05244f' }}>Conteúdo da página</div>
    </Frame>
  ),
};

export const LightVariant: Story = {
  render: () => (
    <Frame>
      <Navbar variant="light" aria-label="Main navigation" elevated>
        <Navbar.Brand href="/">
          <strong style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#05244f' }}>
            PWR
          </strong>
        </Navbar.Brand>
        <Navbar.Items>
          <Navbar.Item label="Início" href="/" active />
          <Navbar.Item label="Clientes" href="/clientes" />
          <Navbar.Item label="Projetos" href="/projetos" />
          <Navbar.Item label="Relatórios" href="/relatorios" />
        </Navbar.Items>
        <Navbar.Actions>
          <button
            type="button"
            style={{
              padding: '0.4rem 1rem',
              background: '#FF5B00',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Novo
          </button>
        </Navbar.Actions>
      </Navbar>
      <div style={{ padding: '2rem', color: '#05244f' }}>Conteúdo da página</div>
    </Frame>
  ),
};

export const Sticky: Story = {
  render: () => (
    <Frame>
      <Navbar sticky elevated aria-label="Main navigation">
        <Navbar.Brand href="/">
          <strong style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}>PWR</strong>
        </Navbar.Brand>
        <Navbar.Items>
          <Navbar.Item label="Início" href="/" active />
          <Navbar.Item label="Clientes" href="/clientes" />
          <Navbar.Item label="Projetos" href="/projetos" />
        </Navbar.Items>
      </Navbar>
      <div style={{ padding: '2rem', color: '#05244f', height: '200vh' }}>
        Role para baixo — a navbar permanece fixada no topo.
      </div>
    </Frame>
  ),
};
