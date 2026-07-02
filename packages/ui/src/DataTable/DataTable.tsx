import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import styles from './DataTable.module.css';

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowKey?: (row: T, index: number) => string | number;
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  caption?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SortIcon({ direction }: { direction: SortDirection }) {
  const upColor = direction === 'asc' ? 'currentColor' : 'rgba(107,114,128,0.35)';
  const downColor = direction === 'desc' ? 'currentColor' : 'rgba(107,114,128,0.35)';
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M5 1L1 6h8L5 1z" fill={upColor} />
      <path d="M5 15l4-5H1l4 5z" fill={downColor} />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ opacity: 0.4 }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getCellValue<T>(row: T, key: string): string {
  const val = (row as Record<string, unknown>)[key];
  if (val === null || val === undefined) return '';
  return String(val).toLowerCase();
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a ?? '').localeCompare(String(b ?? ''), undefined, { sensitivity: 'base' });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DataTable<T = Record<string, unknown>>({
  data,
  columns,
  selectable = false,
  onSelectionChange,
  getRowKey,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  pagination = false,
  pageSize = 10,
  loading = false,
  loadingRows = 5,
  emptyMessage = 'Nenhum resultado encontrado.',
  caption,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const selectAllRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------------------
  // Derived: searched → sorted → paginated
  // -------------------------------------------------------------------------

  const searched = useMemo<T[]>(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        if (col.accessor) {
          // fall back to raw key value for search when accessor is a render fn
          return getCellValue(row, col.key).includes(q);
        }
        return getCellValue(row, col.key).includes(q);
      }),
    );
  }, [data, columns, query]);

  const sorted = useMemo<T[]>(() => {
    if (!sortKey || !sortDir) return searched;
    return [...searched].sort((a, b) => {
      const va = (a as Record<string, unknown>)[sortKey];
      const vb = (b as Record<string, unknown>)[sortKey];
      const cmp = compareValues(va, vb);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [searched, sortKey, sortDir]);

  const totalPages = useMemo(
    () => (pagination ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1),
    [pagination, sorted.length, pageSize],
  );

  const safePage = Math.min(page, totalPages);

  const paginated = useMemo<T[]>(() => {
    if (!pagination) return sorted;
    const start = (safePage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [pagination, sorted, safePage, pageSize]);

  // -------------------------------------------------------------------------
  // Row key helper
  // -------------------------------------------------------------------------

  const rowKey = useCallback(
    (row: T, index: number): string | number =>
      getRowKey ? getRowKey(row, index) : index,
    [getRowKey],
  );

  // -------------------------------------------------------------------------
  // Selection
  // -------------------------------------------------------------------------

  const allPageKeys = useMemo(
    () => paginated.map((row, i) => rowKey(row, i)),
    [paginated, rowKey],
  );

  const selectedCount = selected.size;
  const pageSelectedCount = allPageKeys.filter((k) => selected.has(k)).length;
  const allPageSelected = allPageKeys.length > 0 && pageSelectedCount === allPageKeys.length;
  const somePageSelected = pageSelectedCount > 0 && !allPageSelected;

  // Indeterminate checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = somePageSelected;
    }
  }, [somePageSelected]);

  const toggleRow = useCallback((key: string | number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        allPageKeys.forEach((k) => next.delete(k));
      } else {
        allPageKeys.forEach((k) => next.add(k));
      }
      return next;
    });
  }, [allPageKeys, allPageSelected]);

  // Notify parent whenever selection changes
  useEffect(() => {
    if (!onSelectionChange) return;
    const selectedRows = data.filter((row, i) => selected.has(rowKey(row, i)));
    onSelectionChange(selectedRows);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  // -------------------------------------------------------------------------
  // Sort
  // -------------------------------------------------------------------------

  const handleSort = useCallback(
    (key: string) => {
      setPage(1);
      setSortKey((prevKey) => {
        if (prevKey !== key) {
          setSortDir('asc');
          return key;
        }
        setSortDir((prevDir) => {
          if (prevDir === 'asc') return 'desc';
          if (prevDir === 'desc') return null;
          return 'asc';
        });
        return key;
      });
    },
    [],
  );

  // When sortDir becomes null, also clear sortKey
  useEffect(() => {
    if (sortDir === null) setSortKey(null);
  }, [sortDir]);

  // -------------------------------------------------------------------------
  // Search
  // -------------------------------------------------------------------------

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------

  const showToolbar = searchable || (selectable && selectedCount > 0);

  const colSpan = columns.length + (selectable ? 1 : 0);

  // Range info
  const rangeStart = sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, sorted.length);

  // -------------------------------------------------------------------------
  // JSX
  // -------------------------------------------------------------------------

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {/* Toolbar */}
      {showToolbar && (
        <div className={styles.toolbar}>
          {searchable && (
            <label className={styles.searchBox}>
              <SearchIcon />
              <input
                type="search"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={query}
                onChange={handleSearch}
                aria-label="Buscar na tabela"
              />
            </label>
          )}
          {selectable && selectedCount > 0 && (
            <span className={styles.selectionCount}>
              {selectedCount} selecionado{selectedCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} aria-label={caption}>
          {caption && <caption className={styles.caption}>{caption}</caption>}

          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th className={styles.th} style={{ width: '2.5rem' }}>
                  <input
                    type="checkbox"
                    ref={selectAllRef}
                    checked={allPageSelected}
                    onChange={toggleAll}
                    aria-label="Selecionar todos"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={styles.th}
                  style={{
                    width: col.width,
                    textAlign: col.align ?? 'left',
                  }}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(col.key)}
                      aria-sort={
                        sortKey === col.key && sortDir === 'asc'
                          ? 'ascending'
                          : sortKey === col.key && sortDir === 'desc'
                            ? 'descending'
                            : 'none'
                      }
                    >
                      {col.header}
                      <SortIcon direction={sortKey === col.key ? sortDir : null} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Loading skeleton */}
            {loading &&
              Array.from({ length: loadingRows }).map((_, ri) => (
                <tr key={`skeleton-${ri}`} className={styles.tr}>
                  {selectable && (
                    <td className={styles.td}>
                      <span className={styles.skeleton} style={{ width: '1rem' }} />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={styles.td}>
                      <span
                        className={styles.skeleton}
                        style={{ width: `${55 + ((ri * 13 + col.key.length * 7) % 35)}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty state */}
            {!loading && paginated.length === 0 && (
              <tr className={styles.tr}>
                <td className={styles.emptyCell} colSpan={colSpan}>
                  <div className={styles.emptyState} role="status">
                    <EmptyIcon />
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              paginated.map((row, ri) => {
                const key = rowKey(row, (safePage - 1) * pageSize + ri);
                const isSelected = selected.has(key);
                return (
                  <tr
                    key={key}
                    className={styles.tr}
                    data-selected={isSelected ? 'true' : undefined}
                    data-clickable={onRowClick ? 'true' : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onKeyDown={
                      onRowClick
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                  >
                    {selectable && (
                      <td
                        className={styles.td}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(key);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(key)}
                          aria-label={`Selecionar linha ${ri + 1}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={styles.td}
                        style={{ textAlign: col.align ?? 'left' }}
                      >
                        {col.accessor
                          ? col.accessor(row)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && sorted.length > 0 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            {rangeStart}–{rangeEnd} de {sorted.length}
          </span>
          <div className={styles.pageButtons}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(1)}
              disabled={safePage === 1}
              aria-label="Primeira página"
            >
              «
            </button>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Página anterior"
            >
              ‹
            </button>
            <span className={styles.pageNum}>
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Próxima página"
            >
              ›
            </button>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages}
              aria-label="Última página"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
