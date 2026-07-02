import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { DataTable } from './index';
import type { DataTableColumn } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '1.5rem',
        fontFamily: 'system-ui,sans-serif',
        background: '#f4f5f8',
        minHeight: '400px',
      }}
    >
      {children}
    </div>
  );
}

interface Cliente {
  id: number;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo' | 'pendente';
  receita: number;
  cidade: string;
}

const clientes: Cliente[] = [
  { id: 1, nome: 'Empresa Alpha LTDA', email: 'contato@alpha.com', status: 'ativo', receita: 125000, cidade: 'Fortaleza' },
  { id: 2, nome: 'Beta Tecnologia S.A.', email: 'ti@beta.com.br', status: 'ativo', receita: 89500, cidade: 'São Paulo' },
  { id: 3, nome: 'Gamma Consultoria', email: 'info@gamma.com', status: 'pendente', receita: 45000, cidade: 'Recife' },
  { id: 4, nome: 'Delta Inovações', email: 'delta@delta.com', status: 'inativo', receita: 12000, cidade: 'Brasília' },
  { id: 5, nome: 'Epsilon Digital', email: 'ops@epsilon.io', status: 'ativo', receita: 230000, cidade: 'Fortaleza' },
  { id: 6, nome: 'Zeta Serviços', email: 'zeta@zeta.com.br', status: 'ativo', receita: 67000, cidade: 'Rio de Janeiro' },
  { id: 7, nome: 'Eta Solutions', email: 'hello@eta.io', status: 'pendente', receita: 33000, cidade: 'Curitiba' },
  { id: 8, nome: 'Theta Sistemas', email: 'sistemas@theta.com', status: 'ativo', receita: 180000, cidade: 'Fortaleza' },
  { id: 9, nome: 'Iota Analytics', email: 'dados@iota.ai', status: 'inativo', receita: 5000, cidade: 'Belo Horizonte' },
  { id: 10, nome: 'Kappa Ventures', email: 'investors@kappa.com', status: 'ativo', receita: 450000, cidade: 'São Paulo' },
  { id: 11, nome: 'Lambda Tech', email: 'hello@lambda.dev', status: 'ativo', receita: 92000, cidade: 'Fortaleza' },
  { id: 12, nome: 'Mu Consultores', email: 'mu@muconsult.com', status: 'pendente', receita: 28000, cidade: 'Salvador' },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  ativo:    { bg: '#dcfce7', color: '#15803d' },
  inativo:  { bg: '#fee2e2', color: '#dc2626' },
  pendente: { bg: '#fef3c7', color: '#d97706' },
};

const columns: DataTableColumn<Cliente>[] = [
  { key: 'nome', header: 'Cliente', sortable: true },
  { key: 'email', header: 'E-mail' },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    accessor: (row) => {
      const s = statusStyle[row.status];
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.125rem 0.625rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: s.bg,
            color: s.color,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      );
    },
  },
  {
    key: 'receita',
    header: 'Receita',
    sortable: true,
    align: 'right',
    accessor: (row) =>
      row.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  { key: 'cidade', header: 'Cidade', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Complex/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <Frame>
      <DataTable
        data={clientes}
        columns={columns}
        getRowKey={(r) => r.id}
        searchable
        caption="Clientes PWR Gestão"
      />
    </Frame>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <Frame>
      <DataTable
        data={clientes}
        columns={columns}
        getRowKey={(r) => r.id}
        searchable
        pagination
        pageSize={5}
      />
    </Frame>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [sel, setSel] = useState<Cliente[]>([]);
    return (
      <Frame>
        {sel.length > 0 && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              background: 'rgba(255,91,0,0.08)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#FF5B00',
            }}
          >
            {sel.length} cliente(s): {sel.map((c) => c.nome).join(', ')}
          </div>
        )}
        <DataTable
          data={clientes}
          columns={columns}
          getRowKey={(r) => r.id}
          selectable
          onSelectionChange={setSel}
          pagination
          pageSize={6}
        />
      </Frame>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <Frame>
      <DataTable
        data={[]}
        columns={columns}
        loading
        loadingRows={6}
        searchable
      />
    </Frame>
  ),
};

export const Empty: Story = {
  render: () => (
    <Frame>
      <DataTable
        data={[]}
        columns={columns}
        searchable
        emptyMessage="Nenhum cliente encontrado."
      />
    </Frame>
  ),
};

export const WithRowClick: Story = {
  render: () => (
    <Frame>
      <DataTable
        data={clientes}
        columns={columns}
        getRowKey={(r) => r.id}
        searchable
        pagination
        pageSize={6}
        onRowClick={(row) => alert(`Cliente selecionado: ${row.nome}`)}
        caption="Clique em uma linha para ver detalhes"
      />
    </Frame>
  ),
};

export const AllFeatures: Story = {
  render: () => {
    const [sel, setSel] = useState<Cliente[]>([]);
    return (
      <Frame>
        {sel.length > 0 && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '0.75rem 1rem',
              background: 'rgba(255,91,0,0.08)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#FF5B00',
            }}
          >
            {sel.length} cliente(s) selecionado(s)
          </div>
        )}
        <DataTable
          data={clientes}
          columns={columns}
          getRowKey={(r) => r.id}
          searchable
          selectable
          onSelectionChange={setSel}
          pagination
          pageSize={5}
          caption="Clientes PWR Gestão — Visao Completa"
        />
      </Frame>
    );
  },
};
