import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Kanban } from './index';
import type { KanbanColumnData } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#f4f5f8',
        minHeight: '100vh',
        padding: '1.5rem',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Kanban> = {
  title: 'Complex/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Kanban>;

const initialColumns: KanbanColumnData[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#6b7280',
    limit: 10,
    cards: [
      {
        id: 'c1',
        title: 'Definir escopo do projeto Theta',
        description:
          'Levantar requisitos com stakeholders e criar documento de escopo inicial.',
        priority: 'medium',
        tags: ['Gestão', 'Planejamento'],
        assignee: 'Eric Galvão',
        assigneeAvatar: 'EG',
        dueDate: '15/07',
      },
      {
        id: 'c2',
        title: 'Pesquisa de benchmark concorrentes',
        priority: 'low',
        tags: ['Pesquisa'],
        assignee: 'Ana Lima',
        assigneeAvatar: 'AL',
      },
      {
        id: 'c3',
        title: 'Configurar ambiente de homologação',
        priority: 'high',
        tags: ['DevOps'],
        assignee: 'Bruno Costa',
        assigneeAvatar: 'BC',
        dueDate: '10/07',
      },
    ],
  },
  {
    id: 'em-andamento',
    title: 'Em andamento',
    color: '#FF5B00',
    limit: 4,
    cards: [
      {
        id: 'c4',
        title: 'Desenvolver dashboard de métricas',
        description: 'Integrar com API da plataforma e criar visualizações.',
        priority: 'high',
        tags: ['Dev', 'Frontend'],
        assignee: 'Eric Galvão',
        assigneeAvatar: 'EG',
        dueDate: '08/07',
      },
      {
        id: 'c5',
        title: 'Revisão de contrato cliente Alpha',
        priority: 'medium',
        tags: ['Jurídico'],
        assignee: 'Carla Mota',
        assigneeAvatar: 'CM',
      },
    ],
  },
  {
    id: 'revisao',
    title: 'Em revisão',
    color: '#f59e0b',
    cards: [
      {
        id: 'c6',
        title: 'Proposta comercial Kappa Ventures',
        description: 'Ajustar valores conforme feedback da última reunião.',
        priority: 'high',
        tags: ['Comercial'],
        assignee: 'Ana Lima',
        assigneeAvatar: 'AL',
        dueDate: '05/07',
      },
    ],
  },
  {
    id: 'concluido',
    title: 'Concluído',
    color: '#22c55e',
    cards: [
      {
        id: 'c7',
        title: 'Onboarding equipe Epsilon Digital',
        priority: 'medium',
        tags: ['RH', 'Clientes'],
        assignee: 'Bruno Costa',
        assigneeAvatar: 'BC',
      },
      {
        id: 'c8',
        title: 'Relatório mensal Q2 2025',
        priority: 'low',
        tags: ['Relatório'],
        assignee: 'Eric Galvão',
        assigneeAvatar: 'EG',
      },
      {
        id: 'c9',
        title: 'Atualização LGPD — política interna',
        priority: 'high',
        tags: ['Compliance'],
        assignee: 'Carla Mota',
        assigneeAvatar: 'CM',
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [cols, setCols] = useState<KanbanColumnData[]>(initialColumns);
    return (
      <Frame>
        <h2
          style={{
            margin: '0 0 1rem',
            color: '#05244F',
            fontSize: '1.25rem',
            fontWeight: 700,
          }}
        >
          Sprint 12 — PWR Gestao Tech
        </h2>
        <Kanban
          columns={cols}
          onChange={setCols}
          allowAdd
          onAddCard={(colId) => alert(`Adicionar card em: ${colId}`)}
        />
      </Frame>
    );
  },
};

export const WithLimit: Story = {
  name: 'With WIP Limit',
  render: () => {
    const limitedCols = initialColumns.map(c =>
      c.id === 'em-andamento' ? { ...c, limit: 2 } : c,
    );
    const [cols, setCols] = useState<KanbanColumnData[]>(limitedCols);
    return (
      <Frame>
        <p
          style={{
            marginBottom: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          Coluna &ldquo;Em andamento&rdquo; tem limite WIP de 2 cards — ao ultrapassar, a
          borda e o contador ficam em amarelo de aviso.
        </p>
        <Kanban columns={cols} onChange={setCols} />
      </Frame>
    );
  },
};

export const Empty: Story = {
  name: 'Empty Board',
  render: () => {
    const emptyCols: KanbanColumnData[] = [
      { id: 'todo', title: 'A Fazer', color: '#6b7280', cards: [] },
      { id: 'doing', title: 'Em Andamento', color: '#FF5B00', cards: [] },
      { id: 'done', title: 'Concluido', color: '#22c55e', cards: [] },
    ];
    const [cols, setCols] = useState<KanbanColumnData[]>(emptyCols);
    return (
      <Frame>
        <p
          style={{
            marginBottom: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          Board vazio com tres colunas — area de drop com borda tracejada.
        </p>
        <Kanban
          columns={cols}
          onChange={setCols}
          allowAdd
          onAddCard={(colId) => alert(`Adicionar card em: ${colId}`)}
        />
      </Frame>
    );
  },
};

export const Minimal: Story = {
  name: 'Minimal Cards',
  render: () => {
    const minimalCols: KanbanColumnData[] = [
      {
        id: 'todo',
        title: 'A Fazer',
        cards: [
          { id: 'm1', title: 'Tarefa simples sem metadados' },
          { id: 'm2', title: 'Outra tarefa basica', priority: 'low' },
        ],
      },
      {
        id: 'doing',
        title: 'Fazendo',
        cards: [
          { id: 'm3', title: 'Em progresso', assignee: 'Dev A', assigneeAvatar: 'DA' },
        ],
      },
      {
        id: 'done',
        title: 'Feito',
        cards: [
          { id: 'm4', title: 'Tarefa finalizada', priority: 'high' },
        ],
      },
    ];
    const [cols, setCols] = useState<KanbanColumnData[]>(minimalCols);
    return (
      <Frame>
        <Kanban columns={cols} onChange={setCols} />
      </Frame>
    );
  },
};
