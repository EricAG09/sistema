import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { defaultTheme, themeToCssVariables } from '@nexus-ui/theme';
import { Calendar } from './index';
import type { CalendarEvent } from './index';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...themeToCssVariables(defaultTheme),
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Calendar> = {
  title: 'Complex/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Calendar>;

const today = new Date();

const events: CalendarEvent[] = [
  {
    id: '1',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    title: 'Reunião PWR — Sprint Review',
    color: '#FF5B00',
  },
  {
    id: '2',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    title: 'Entrega de proposta',
    color: '#3C58B4',
  },
  {
    id: '3',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    title: 'Call com cliente Alpha',
    color: '#22c55e',
  },
  {
    id: '4',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    title: 'Apresentação mensal',
    color: '#f59e0b',
  },
  {
    id: '5',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
    title: 'Onboarding Theta Sistemas',
    color: '#FF5B00',
  },
];

export const Default: Story = {
  render: () => (
    <Frame>
      <Calendar />
    </Frame>
  ),
};

export const WithEvents: Story = {
  render: () => (
    <Frame>
      <Calendar events={events} defaultValue={today} />
    </Frame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(today);
    return (
      <Frame>
        <Calendar value={date} onChange={setDate} events={events} />
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          Selecionado:{' '}
          {date.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </Frame>
    );
  },
};

export const WithMinMax: Story = {
  render: () => (
    <Frame>
      <Calendar
        defaultValue={today}
        minDate={
          new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)
        }
        maxDate={
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
        }
      />
    </Frame>
  ),
};

export const RangeMode: Story = {
  render: () => {
    const [start, setStart] = useState<Date>(today);
    const [end, setEnd] = useState<Date>(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    );
    return (
      <Frame>
        <Calendar
          mode="range"
          value={start}
          onChange={setStart}
          rangeEnd={end}
          onRangeEndChange={setEnd}
        />
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          Intervalo:{' '}
          {start.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short',
          })}{' '}
          —{' '}
          {end.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short',
          })}
        </p>
      </Frame>
    );
  },
};
