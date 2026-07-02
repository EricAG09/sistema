import React from 'react';
import type { Meta } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { BarChart, LineChart, PieChart } from './index';

function Frame({
  children,
  width = '600px',
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '1.5rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: width,
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta = { title: 'Complex/Charts', tags: ['autodocs'] };
export default meta;

// BarChart stories
export const BarChartDefault = {
  name: 'BarChart — Receita por Filial',
  render: () => (
    <Frame>
      <BarChart
        title="Receita por Filial"
        subtitle="Julho 2025"
        data={[
          { label: 'Fortaleza', value: 485000, color: '#FF5B00' },
          { label: 'São Paulo', value: 312000, color: '#05244F' },
          { label: 'Recife', value: 198000, color: '#3C58B4' },
          { label: 'Brasília', value: 145000, color: '#273A76' },
          { label: 'Salvador', value: 89000, color: '#f59e0b' },
        ]}
        formatValue={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
        showGrid
        showValues
      />
    </Frame>
  ),
};

export const BarChartNoGrid = {
  name: 'BarChart — Sem Grid',
  render: () => (
    <Frame>
      <BarChart
        title="Contratos Fechados"
        subtitle="Por consultor — Q2 2025"
        data={[
          { label: 'Ana', value: 34 },
          { label: 'Bruno', value: 28 },
          { label: 'Carla', value: 41 },
          { label: 'Diego', value: 19 },
          { label: 'Eva', value: 36 },
        ]}
        showGrid={false}
        showValues
        barRadius={6}
      />
    </Frame>
  ),
};

export const BarChartTall = {
  name: 'BarChart — Alto (360px)',
  render: () => (
    <Frame>
      <BarChart
        title="Horas Faturadas por Projeto"
        subtitle="Acumulado 2025"
        height={360}
        data={[
          { label: 'Manhattan', value: 1240 },
          { label: 'Nexus', value: 980 },
          { label: 'Atlas', value: 760 },
          { label: 'Vertex', value: 430 },
          { label: 'Orion', value: 310 },
          { label: 'Sigma', value: 175 },
        ]}
        formatValue={(v) => `${v}h`}
      />
    </Frame>
  ),
};

// LineChart stories
export const LineChartDefault = {
  name: 'LineChart — Evolução Mensal',
  render: () => (
    <Frame>
      <LineChart
        title="Evolução de Receita"
        subtitle="Jan–Jul 2025"
        labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']}
        series={[
          {
            label: 'Receita',
            data: [210000, 245000, 198000, 310000, 285000, 340000, 412000],
            color: '#FF5B00',
          },
          {
            label: 'Meta',
            data: [250000, 250000, 250000, 300000, 300000, 350000, 400000],
            color: '#05244F',
          },
        ]}
        formatValue={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
        smooth
        showDots
        showLegend
      />
    </Frame>
  ),
};

export const LineChartSingleSeries = {
  name: 'LineChart — Série única (sem legenda)',
  render: () => (
    <Frame>
      <LineChart
        title="NPS Médio"
        subtitle="Acompanhamento semanal — Jul 2025"
        labels={['S1', 'S2', 'S3', 'S4']}
        series={[{ label: 'NPS', data: [72, 68, 75, 81], color: '#FF5B00' }]}
        formatValue={(v) => v.toFixed(0)}
        smooth
        showDots
        showLegend={false}
      />
    </Frame>
  ),
};

export const LineChartMultiSeries = {
  name: 'LineChart — Multi-série',
  render: () => (
    <Frame width="700px">
      <LineChart
        title="Indicadores Operacionais"
        subtitle="Jan–Jun 2025"
        labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']}
        series={[
          {
            label: 'Novos Clientes',
            data: [12, 18, 15, 22, 19, 27],
            color: '#FF5B00',
          },
          {
            label: 'Renovações',
            data: [8, 10, 14, 11, 16, 20],
            color: '#3C58B4',
          },
          {
            label: 'Cancelamentos',
            data: [3, 2, 4, 1, 3, 2],
            color: '#ef4444',
          },
        ]}
        formatValue={(v) => v.toFixed(0)}
        smooth
        showDots
        showLegend
      />
    </Frame>
  ),
};

// PieChart stories
export const PieChartDefault = {
  name: 'PieChart — Clientes por Segmento',
  render: () => (
    <Frame width="480px">
      <PieChart
        title="Clientes por Segmento"
        data={[
          { label: 'Tecnologia', value: 42 },
          { label: 'Saúde', value: 28 },
          { label: 'Varejo', value: 18 },
          { label: 'Indústria', value: 12 },
        ]}
        showLegend
      />
    </Frame>
  ),
};

export const DonutChart = {
  name: 'PieChart — Donut (Contratos Ativos)',
  render: () => (
    <Frame width="480px">
      <PieChart
        title="Status dos Contratos"
        donut
        data={[
          { label: 'Ativos', value: 87, color: '#22c55e' },
          { label: 'Pendentes', value: 24, color: '#f59e0b' },
          { label: 'Vencidos', value: 11, color: '#ef4444' },
        ]}
        showLegend
      />
    </Frame>
  ),
};

export const DonutChartRevenue = {
  name: 'PieChart — Donut (Receita por Serviço)',
  render: () => (
    <Frame width="480px">
      <PieChart
        title="Receita por Linha de Serviço"
        subtitle="Acumulado 2025"
        donut
        size={220}
        data={[
          { label: 'Consultoria', value: 1240000, color: '#FF5B00' },
          { label: 'Treinamentos', value: 480000, color: '#05244F' },
          { label: 'Assessoria', value: 310000, color: '#3C58B4' },
          { label: 'Outros', value: 95000, color: '#273A76' },
        ]}
        formatValue={(v, total) =>
          `R$ ${(v / 1000).toFixed(0)}k (${((v / total) * 100).toFixed(1)}%)`
        }
        showLegend
      />
    </Frame>
  ),
};

export const PieChartNoLegend = {
  name: 'PieChart — Sem legenda',
  render: () => (
    <Frame width="300px">
      <PieChart
        title="Distribuição de Horas"
        data={[
          { label: 'Projetos', value: 60 },
          { label: 'Administrativo', value: 25 },
          { label: 'Capacitação', value: 15 },
        ]}
        showLegend={false}
        size={180}
      />
    </Frame>
  ),
};
