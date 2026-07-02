import React from 'react';
import { KanbanCard } from './KanbanCard';
import styles from './Kanban.module.css';
import type { KanbanColumnData } from './Kanban';

interface KanbanColumnProps {
  column: KanbanColumnData;
  draggingCardId: string | null;
  dragOverCol: string | null;
  dragOverCardId: string | null;
  onDragStart: (cardId: string, colId: string) => void;
  onDragEnd: () => void;
  onDragOverColumn: (colId: string) => void;
  onDragOverCard: (cardId: string) => void;
  onDrop: (colId: string) => void;
  allowAdd?: boolean;
  onAddCard?: (colId: string) => void;
}

export function KanbanColumn({
  column,
  draggingCardId,
  dragOverCol,
  dragOverCardId,
  onDragStart,
  onDragEnd,
  onDragOverColumn,
  onDragOverCard,
  onDrop,
  allowAdd,
  onAddCard,
}: KanbanColumnProps): JSX.Element {
  const isOver = dragOverCol === column.id;
  const isOverLimit = column.limit != null && column.cards.length >= column.limit;

  return (
    <div
      className={styles.column}
      data-over={isOver}
      data-over-limit={isOverLimit}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverColumn(column.id);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(column.id);
      }}
      role="group"
      aria-label={`Coluna: ${column.title}`}
    >
      {/* Column header */}
      <div className={styles.columnHeader}>
        <div className={styles.columnTitleRow}>
          {column.color && (
            <span
              className={styles.columnColorDot}
              style={{ background: column.color }}
              aria-hidden="true"
            />
          )}
          <h3 className={styles.columnTitle}>{column.title}</h3>
          <span
            className={styles.cardCount}
            data-over-limit={isOverLimit}
            aria-label={`${column.cards.length}${column.limit != null ? ` de ${column.limit}` : ''} cards`}
          >
            {column.cards.length}
            {column.limit != null ? `/${column.limit}` : ''}
          </span>
        </div>
        {allowAdd && (
          <button
            className={styles.addBtn}
            onClick={() => onAddCard?.(column.id)}
            aria-label={`Adicionar card em ${column.title}`}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M12 5v14m-7-7h14" />
            </svg>
          </button>
        )}
      </div>

      {/* Cards */}
      <div className={styles.cardList} role="list" aria-label={`Cards em ${column.title}`}>
        {column.cards.length === 0 ? (
          <div className={styles.emptyColumn} data-over={isOver} aria-live="polite">
            Arraste cards aqui
          </div>
        ) : (
          column.cards.map(card => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={column.id}
              isDragging={draggingCardId === card.id}
              isDragOver={dragOverCardId === card.id && dragOverCol === column.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOverCard}
            />
          ))
        )}
      </div>
    </div>
  );
}
