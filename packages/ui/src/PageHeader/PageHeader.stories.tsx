import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { PageHeader } from './index';

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

const meta: Meta<typeof PageHeader> = {
  title: 'Foundation/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Simple: Story = {
  render: () => (
    <Frame>
      <PageHeader title="Clientes" />
    </Frame>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <Frame>
      <PageHeader
        title="Editar Cliente"
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Clientes', href: '/clientes' },
          { label: 'Editar Cliente' },
        ]}
      />
    </Frame>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Frame>
      <PageHeader
        title="Clientes"
        actions={
          <button
            type="button"
            style={{
              padding: '0.5rem 1.25rem',
              background: '#FF5B00',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Novo Cliente
          </button>
        }
      />
    </Frame>
  ),
};

export const Full: Story = {
  render: () => (
    <Frame>
      <PageHeader
        title="Detalhes do Projeto"
        subtitle="Informações completas sobre o projeto Manhattan e seus marcos de entrega."
        backHref="/projetos"
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Projetos', href: '/projetos' },
          { label: 'Manhattan' },
        ]}
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#05244f',
                border: '1px solid rgba(5,36,79,0.2)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Editar
            </button>
            <button
              type="button"
              style={{
                padding: '0.5rem 1.25rem',
                background: '#FF5B00',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Publicar
            </button>
          </div>
        }
      />
    </Frame>
  ),
};
