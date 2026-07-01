import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './index';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" />
  </svg>
);
const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5a3 3 0 0 1 0 6" />
  </svg>
);
const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" />
  </svg>
);

function Frame({ children, height = 480 }: { children: React.ReactNode; height?: number }) {
  return (
    <div style={{ ...themeToCssVariables(defaultTheme), height, display: 'flex' }}>{children}</div>
  );
}

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' }
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <Frame>
      <Sidebar aria-label="Main navigation">
        <Sidebar.Header>
          <strong>PWR</strong>
        </Sidebar.Header>
        <Sidebar.Group label="Gestão">
          <Sidebar.Item icon={<HomeIcon />} label="Início" href="/" active />
          <Sidebar.Item icon={<UsersIcon />} label="Clientes" href="/clientes" />
          <Sidebar.Item icon={<ChartIcon />} label="Relatórios" href="/relatorios" badge="3" />
        </Sidebar.Group>
        <Sidebar.Footer>eric@pwrgestao.com</Sidebar.Footer>
      </Sidebar>
    </Frame>
  )
};

export const Collapsed: Story = {
  render: () => (
    <Frame>
      <Sidebar aria-label="Main navigation" defaultCollapsed>
        <Sidebar.Header>
          <strong>P</strong>
        </Sidebar.Header>
        <Sidebar.Group label="Gestão">
          <Sidebar.Item icon={<HomeIcon />} label="Início" href="/" active />
          <Sidebar.Item icon={<UsersIcon />} label="Clientes" href="/clientes" />
        </Sidebar.Group>
      </Sidebar>
    </Frame>
  )
};

export const WithSubmenus: Story = {
  render: () => (
    <Frame>
      <Sidebar aria-label="Main navigation">
        <Sidebar.Group label="Gestão">
          <Sidebar.Item icon={<HomeIcon />} label="Início" href="/" active />
          <Sidebar.Submenu icon={<UsersIcon />} label="Clientes" defaultOpen>
            <Sidebar.Item label="Listar" href="/clientes" />
            <Sidebar.Item label="Novo" href="/clientes/novo" />
          </Sidebar.Submenu>
        </Sidebar.Group>
      </Sidebar>
    </Frame>
  )
};

export const LightVariant: Story = {
  render: () => (
    <Frame>
      <Sidebar aria-label="Main navigation" variant="light">
        <Sidebar.Header>
          <strong>PWR</strong>
        </Sidebar.Header>
        <Sidebar.Group label="Gestão">
          <Sidebar.Item icon={<HomeIcon />} label="Início" href="/" active />
          <Sidebar.Item icon={<UsersIcon />} label="Clientes" href="/clientes" />
        </Sidebar.Group>
      </Sidebar>
    </Frame>
  )
};
