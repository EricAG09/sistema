import React, { useState, useMemo, useCallback } from 'react';
import styles from './Calendar.module.css';

export interface CalendarEvent {
  id: string;
  date: Date | string;
  title: string;
  color?: string;
}

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  /** Range mode: value is start, rangeEnd is end */
  rangeEnd?: Date;
  onRangeEndChange?: (date: Date) => void;
  mode?: 'single' | 'range';
  events?: CalendarEvent[];
  minDate?: Date;
  maxDate?: Date;
  /** IETF language tag for month/day formatting. Defaults to 'pt-BR' */
  locale?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function isBefore(a: Date, b: Date): boolean {
  return a.getTime() < b.getTime();
}

function isAfter(a: Date, b: Date): boolean {
  return a.getTime() > b.getTime();
}

function buildGrid(monthStart: Date): (Date | null)[] {
  const firstDow = monthStart.getDay(); // 0 = Sunday
  const daysInMonth = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0,
  ).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ---------------------------------------------------------------------------
// SVG chevrons
// ---------------------------------------------------------------------------

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Week day labels
// ---------------------------------------------------------------------------

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Calendar({
  value,
  defaultValue,
  onChange,
  rangeEnd,
  onRangeEndChange: _onRangeEndChange,
  mode = 'single',
  events,
  minDate,
  maxDate,
  locale = 'pt-BR',
  className,
}: CalendarProps) {
  const [viewDate, setViewDate] = useState<Date>(() => {
    const base = value ?? defaultValue ?? new Date();
    return startOfMonth(base);
  });

  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );

  const selectedDate = value ?? internalValue;

  // Navigate months
  const prevMonth = useCallback(() => {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  // Build grid memoised on viewDate
  const grid = useMemo(() => buildGrid(viewDate), [viewDate]);

  // Event lookup: group events by YYYY-M-D key
  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events ?? []) {
      const d = typeof ev.date === 'string' ? new Date(ev.date) : ev.date;
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [events]);

  const getEventsForDay = useCallback(
    (d: Date): CalendarEvent[] => {
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      return eventMap.get(key) ?? [];
    },
    [eventMap],
  );

  // Select handler
  const handleSelect = useCallback(
    (d: Date) => {
      if (minDate && isBefore(d, minDate)) return;
      if (maxDate && isAfter(d, maxDate)) return;
      if (value === undefined) setInternalValue(d);
      onChange?.(d);
    },
    [minDate, maxDate, value, onChange],
  );

  // Range helpers
  const isInRange = useCallback(
    (d: Date): boolean => {
      if (mode !== 'range' || !selectedDate || !rangeEnd) return false;
      const start = isBefore(selectedDate, rangeEnd) ? selectedDate : rangeEnd;
      const end = isBefore(selectedDate, rangeEnd) ? rangeEnd : selectedDate;
      return isAfter(d, start) && isBefore(d, end);
    },
    [mode, selectedDate, rangeEnd],
  );

  const isRangeStart = useCallback(
    (d: Date): boolean =>
      mode === 'range' && !!selectedDate && isSameDay(d, selectedDate),
    [mode, selectedDate],
  );

  const isRangeEnd = useCallback(
    (d: Date): boolean =>
      mode === 'range' && !!rangeEnd && isSameDay(d, rangeEnd),
    [mode, rangeEnd],
  );

  // Keyboard navigation: arrow keys move focus between day buttons
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const focused = document.activeElement as HTMLElement | null;
      if (!focused || !focused.dataset['date']) return;

      const currentDate = new Date(focused.dataset['date']);
      let target: Date | null = null;

      switch (e.key) {
        case 'ArrowRight':
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1,
          );
          break;
        case 'ArrowLeft':
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1,
          );
          break;
        case 'ArrowDown':
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 7,
          );
          break;
        case 'ArrowUp':
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7,
          );
          break;
        default:
          return;
      }

      e.preventDefault();

      // Navigate view if target is outside current month
      if (
        target.getMonth() !== viewDate.getMonth() ||
        target.getFullYear() !== viewDate.getFullYear()
      ) {
        setViewDate(startOfMonth(target));
      }

      // Focus the button after state update
      setTimeout(() => {
        const isoDate = target!.toISOString().slice(0, 10);
        const btn = document.querySelector<HTMLButtonElement>(
          `[data-date="${isoDate}"]`,
        );
        btn?.focus();
      }, 0);
    },
    [viewDate],
  );

  const monthLabel = viewDate.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div
      className={[styles.calendar, className].filter(Boolean).join(' ')}
      role="application"
      aria-label="Calendário"
      onKeyDown={handleKeyDown}
    >
      {/* Header: prev | Month Year | next */}
      <div className={styles.header}>
        <button
          className={styles.navBtn}
          onClick={prevMonth}
          aria-label="Mês anterior"
          type="button"
        >
          <ChevronLeft />
        </button>
        <span className={styles.monthLabel}>{monthLabel}</span>
        <button
          className={styles.navBtn}
          onClick={nextMonth}
          aria-label="Próximo mês"
          type="button"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Week day headers */}
      <div className={styles.weekDays} aria-hidden="true">
        {WEEK_DAYS.map(d => (
          <div key={d} className={styles.weekDay}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className={styles.grid} role="grid" aria-label={monthLabel}>
        {grid.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className={styles.empty} role="gridcell" />;
          }

          const dayEvents = getEventsForDay(day);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isDisabled =
            (!!minDate && isBefore(day, minDate)) ||
            (!!maxDate && isAfter(day, maxDate));
          const inRange = isInRange(day);
          const rangeS = isRangeStart(day);
          const rangeE = isRangeEnd(day);
          const isOtherMonth = day.getMonth() !== viewDate.getMonth();

          // ISO date string for keyboard nav data attribute (date only, local)
          const isoDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;

          return (
            <div key={day.toISOString()} role="gridcell">
              <button
                className={styles.day}
                data-today={isToday(day) || undefined}
                data-selected={isSelected || undefined}
                data-disabled={isDisabled || undefined}
                data-in-range={inRange || undefined}
                data-range-start={rangeS || undefined}
                data-range-end={rangeE || undefined}
                data-other-month={isOtherMonth || undefined}
                data-date={isoDate}
                onClick={() => !isDisabled && handleSelect(day)}
                disabled={isDisabled}
                aria-label={day.toLocaleDateString(locale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                aria-pressed={isSelected}
                aria-current={isToday(day) ? 'date' : undefined}
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                <span className={styles.dayNum}>{day.getDate()}</span>
                {dayEvents.length > 0 && (
                  <span className={styles.dots} aria-hidden="true">
                    {dayEvents.slice(0, 3).map((ev, j) => (
                      <span
                        key={j}
                        className={styles.dot}
                        style={{ background: ev.color ?? '#FF5B00' }}
                      />
                    ))}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Events list for selected day */}
      {selectedDate && selectedDayEvents.length > 0 && (
        <div className={styles.eventList} aria-live="polite">
          <p className={styles.eventListTitle}>
            {selectedDate.toLocaleDateString(locale, {
              day: 'numeric',
              month: 'long',
            })}
          </p>
          {selectedDayEvents.map(ev => (
            <div key={ev.id} className={styles.eventItem}>
              <span
                className={styles.eventDot}
                style={{ background: ev.color ?? '#FF5B00' }}
                aria-hidden="true"
              />
              <span className={styles.eventTitle}>{ev.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
