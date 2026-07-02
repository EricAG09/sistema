import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import styles from './Kanban.module.css';

export type KanbanPriority = 'low' | 'medium' | 'high';

export interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  priority?: KanbanPriority;
  tags?: string[];
  assignee?: string;
  /** Initials or URL for assignee avatar */
  assigneeAvatar?: string;
  dueDate?: string;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  color?: string;
  /** Max cards allowed (shows warning color when exceeded) */
  limit?: number;
  cards: KanbanCardData[];
}

export interface KanbanProps {
  columns: KanbanColumnData[];
  /** Called with updated columns after any card move */
  onChange?: (columns: KanbanColumnData[]) => void;
  /** Called after a card is moved between columns */
  onCardMove?: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    newColumns: KanbanColumnData[],
  ) => void;
  /** Allow adding new cards (shows + button) */
  allowAdd?: boolean;
  onAddCard?: (columnId: string) => void;
}

export function Kanban({
  columns: columnsProp,
  onChange,
  onCardMove,
  allowAdd,
  onAddCard,
}: KanbanProps): JSX.Element {
  const [columns, setColumns] = useState<KanbanColumnData[]>(columnsProp);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [draggingFromCol, setDraggingFromCol] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [dragOverCardId, setDragOverCardId] = useState<string | null>(null);

  // Sync with prop changes
  React.useEffect(() => {
    setColumns(columnsProp);
  }, [columnsProp]);

  function updateColumns(next: KanbanColumnData[]) {
    setColumns(next);
    onChange?.(next);
  }

  function handleDragStart(cardId: string, columnId: string) {
    setDraggingCardId(cardId);
    setDraggingFromCol(columnId);
  }

  function handleDragEnd() {
    setDraggingCardId(null);
    setDraggingFromCol(null);
    setDragOverCol(null);
    setDragOverCardId(null);
  }

  function handleDragOverColumn(columnId: string) {
    setDragOverCol(columnId);
  }

  function handleDragOverCard(cardId: string) {
    setDragOverCardId(cardId);
  }

  function handleDrop(targetColumnId: string) {
    if (!draggingCardId || !draggingFromCol) return;

    const next = columns.map(col => ({ ...col, cards: [...col.cards] }));
    const fromCol = next.find(c => c.id === draggingFromCol);
    const toCol = next.find(c => c.id === targetColumnId);
    if (!fromCol || !toCol) return;

    // Remove from source
    const cardIndex = fromCol.cards.findIndex(c => c.id === draggingCardId);
    if (cardIndex === -1) return;
    const [card] = fromCol.cards.splice(cardIndex, 1);

    // Insert into target (before dragOverCard if hovering a card, else at end)
    if (dragOverCardId && targetColumnId === dragOverCol) {
      const targetIdx = toCol.cards.findIndex(c => c.id === dragOverCardId);
      toCol.cards.splice(targetIdx >= 0 ? targetIdx : toCol.cards.length, 0, card);
    } else {
      toCol.cards.push(card);
    }

    const fromId = draggingFromCol;
    handleDragEnd();
    updateColumns(next);
    onCardMove?.(card.id, fromId, targetColumnId, next);
  }

  return (
    <div className={styles.board} role="region" aria-label="Kanban board">
      {columns.map(col => (
        <KanbanColumn
          key={col.id}
          column={col}
          draggingCardId={draggingCardId}
          dragOverCol={dragOverCol}
          dragOverCardId={dragOverCardId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOverColumn={handleDragOverColumn}
          onDragOverCard={handleDragOverCard}
          onDrop={handleDrop}
          allowAdd={allowAdd}
          onAddCard={onAddCard}
        />
      ))}
    </div>
  );
}
