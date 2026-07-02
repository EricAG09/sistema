import React from 'react';
import styles from './Kanban.module.css';
import type { KanbanCardData } from './Kanban';

interface KanbanCardProps {
  card: KanbanCardData;
  columnId: string;
  isDragging: boolean;
  isDragOver: boolean;
  onDragStart: (cardId: string, colId: string) => void;
  onDragEnd: () => void;
  onDragOver: (cardId: string) => void;
}

const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
  low: { bg: '#dcfce7', text: '#15803d', label: 'Baixa' },
  medium: { bg: '#fef3c7', text: '#d97706', label: 'Média' },
  high: { bg: '#fee2e2', text: '#dc2626', label: 'Alta' },
};

export function KanbanCard({
  card,
  columnId,
  isDragging,
  isDragOver,
  onDragStart,
  onDragEnd,
  onDragOver,
}: KanbanCardProps): JSX.Element {
  const prio = card.priority ? priorityColors[card.priority] : null;

  return (
    <div
      className={styles.card}
      draggable
      data-dragging={isDragging}
      data-drag-over={isDragOver}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(card.id, columnId);
      }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragOver(card.id);
      }}
      role="listitem"
      tabIndex={0}
      aria-label={`Card: ${card.title}${card.priority ? `, prioridade ${priorityColors[card.priority]?.label}` : ''}`}
      aria-grabbed={isDragging}
    >
      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className={styles.cardTags} aria-label="Tags">
          {card.tags.map(tag => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <p className={styles.cardTitle}>{card.title}</p>

      {/* Description */}
      {card.description && (
        <p className={styles.cardDesc}>{card.description}</p>
      )}

      {/* Footer: priority + assignee + due date */}
      {(prio || card.assignee || card.dueDate) && (
        <div className={styles.cardFooter}>
          {prio && (
            <span
              className={styles.priority}
              style={{ background: prio.bg, color: prio.text }}
              aria-label={`Prioridade: ${prio.label}`}
            >
              {prio.label}
            </span>
          )}
          <div className={styles.cardMeta}>
            {card.dueDate && (
              <span className={styles.dueDate} aria-label={`Data limite: ${card.dueDate}`}>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {card.dueDate}
              </span>
            )}
            {card.assignee && (
              <span className={styles.assignee} title={card.assignee}>
                {card.assigneeAvatar && card.assigneeAvatar.startsWith('http') ? (
                  <img
                    src={card.assigneeAvatar}
                    alt={card.assignee}
                    className={styles.assigneeImg}
                  />
                ) : (
                  <span className={styles.assigneeInitials} aria-label={card.assignee}>
                    {card.assigneeAvatar ??
                      card.assignee
                        .split(' ')
                        .map(w => w[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
